import useSWR from "swr";
import axiosClient from "./axios";

export function register(data) {
    return axiosClient
        .post("/api/users/register", { ...data })
        .then((response) => {
            return response;
        });
}

export function adminRegister(data) {
    return axiosClient
        .post("/api/admin/register", { ...data })
        .then((response) => {
            return response;
        });
}

export function login(data) {
    return axiosClient
        .post("/api/users/login", { ...data })
        .then((response) => {
            return response;
        });
}
export function adminLogin(data) {
    return axiosClient
        .post("/api/admin/login", { ...data })
        .then((response) => {
            return response;
        });
}

export function forgotPassword(data) {
    return axiosClient
        .post("/api/user/forgot-password", { ...data })
        .then((response) => {
            return response;
        });
}

export function resetPassword(data) {
    return axiosClient
        .post("/api/user/reset-password", { ...data })
        .then((response) => {
            return response;
        });
}

export function savePhoneNumber(data) {
    return axiosClient
        .post("/api/me/phoneNumber", { ...data })
        .then((response) => {
            return response;
        });
}

export function verifyPhoneNumber(data) {
    return axiosClient
        .post("/api/me/phoneNumber/verify", { ...data })
        .then((response) => {
            return response;
        });
}

export function saveEmail(data) {
    return axiosClient.post("/api/me/email", { ...data }).then((response) => {
        return response;
    });
}

export function verifyEmail(data) {
    return axiosClient
        .post("/api/me/email/verify", { ...data })
        .then((response) => {
            return response;
        });
}
export function getVerifyCode() {
    return axiosClient.get("/api/refreshVerifyToken").then((response) => {
        return response;
    });
}

export function getAuctions() {
    return axiosClient.get("/api/auctions", {}).then((response) => {
        return response?.data;
    });
}

export function getMyProducts() {
    return axiosClient
        .get(`/api/products?filter[purchased]=1`, {})
        .then((response) => {
            return response?.data;
        });
}

export function getWinningProducts() {
    return axiosClient.get(`/api/user/winning-history`).then((response) => {
        return response.data;
    });
}

export function getEnvironmentState() {
    return axiosClient.get(`/api/categories`).then((response) => {
        return response.data;
    });
}

export function useWinningProducts() {
    const { data, error } = useSWR(`user/winning-history`, async () =>
        getWinningProducts()
    );

    return { data, error };
}

export function getProducts({ page, perPage, sort, filter }) {
    const allFilter = filter.reduce((prevVal, currVal, idx) => {
        return idx == 0
            ? currVal
            : prevVal + (idx % 2 == 0 ? "&" : "=") + currVal;
    }, "");

    return axiosClient
        .get(`/api/products?${allFilter}`, {
            params: {
                page,
                perPage,
                sort,
            },
        })
        .then((response) => {
            return {
                data: response.data,
                count: Number(response.headers["content-range"]),
            };
        });
}

export function useProducts({
    page = 0,
    perPage = 11,
    sort = ["startAt", "ASC"],
    filter = [],
}) {
    const { data, error } = useSWR(
        `products/${perPage}/${page}/${sort?.join("/")}/${filter?.join("/")}`,
        async () => getProducts({ page, perPage, sort, filter })
    );

    return { data, error };
}

export function createProposal(data) {
    return axiosClient.post("/api/proposals", { ...data }).then((response) => {
        return response;
    });
}

//todo dynamic bolgoh
export function getCoursesByCategory() {
    return axiosClient.get(`/api/categories/1/courses`).then((response) => {
        return response?.data;
    });
}

export function useCoursesByCategory() {
    const { data, error } = useSWR(`categories/1/courses`, async () =>
        getCoursesByCategory()
    );

    return { data, error };
}

export function deleteCourseById(id) {
    return axiosClient.delete(`/api/admin/courses/${id}`).then((response) => {
        return response?.data;
    });
}

export function getCourseById(id) {
    return axiosClient.get(`/api/courses/${id}`).then((response) => {
        return response?.data;
    });
}

export function useCourseById(id) {
    const { data, error } = useSWR(`/api/courses/${id}`, async () =>
        getCourseById(id)
    );

    return { data, loading: !data && !error, error };
}

export function getSubCourseById(id) {
    return axiosClient.get(`/api/admin/subCourses/${id}`).then((response) => {
        return response?.data;
    });
}

export function useSubCourseById(id) {
    const { data, error } = useSWR(`/api/admin/subCourses/${id}`, async () =>
        getSubCourseById(id)
    );

    return { data, loading: !data && !error, error };
}

export function createCourse(data) {
    return axiosClient
        .post("/api/admin/courses", { ...data })
        .then((response) => {
            return response;
        });
}

export function createChapter(id, data) {
    return axiosClient
        .post(`/api/admin/courses/${id}/chapter`, { ...data })
        .then((response) => {
            return response;
        });
}

export function updateSubCourse(id, data) {
    return axiosClient
        .put(`/api/admin/subCourses/${id}`, { ...data })
        .then((response) => {
            return response;
        });
}

export function updateCourse(id, data) {
    return axiosClient
        .put(`/api/admin/courses/${id}`, { ...data })
        .then((response) => {
            return response;
        });
}

export function deleteChapter(id, data) {
    return axiosClient
        .post(`/api/admin/courses/${id}/chapter`)
        .then((response) => {
            return response;
        });
}

export function createSubCourse(data) {
    return axiosClient
        .post(`/api/admin/subCourses`, { ...data })
        .then((response) => {
            return response;
        });
}

export function checkMemberNft(data) {
    return axiosClient
        .post("/api/user/claim-nft", { ...data })
        .then((response) => {
            return response;
        });
}

// export function getAuctionBids(productId) {
//     return axiosClient
//         .get(`/api/auctions/${productId}/bids`)
//         .then((response) => {
//             return response.data
//         })
// }
export function getAuctionBids(productId, { page, perPage, sort }) {
    return axiosClient
        .get(`/api/auctions/${productId}/bids`, {
            params: {
                page,
                perPage,
                sort,
            },
        })
        .then((response) => {
            return response.data;
        });
}

export function getProductById(id) {
    return axiosClient.get(`/api/products/${id}`).then((response) => {
        return response?.data;
    });
}

export function saveBid(data) {
    return axiosClient.post("/api/bids", { ...data }).then((response) => {
        return response;
    });
}

//dynamic bolgoh
export function getUserProfile() {
    return axiosClient.get("/api/admin/profile/1").then((response) => {
        return response?.data;
    });
}

//dynamic bolgoh
export function getAdminProfile() {
    return axiosClient.get("/api/admin/profile").then((response) => {
        return response?.data;
    });
}
