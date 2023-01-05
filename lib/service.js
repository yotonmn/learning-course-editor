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

export function getProductCollateral(id) {
    return axiosClient
        .get(`/api/products/${id}/payment`, {})
        .then((response) => {
            return response?.data;
        });
}

export function getPurchaseOrder(id) {
    return axiosClient
        .get(`/api/auctions/${id}/payment`, {})
        .then((response) => {
            return response;
        });
}

export function useKyc() {
    const { data, error } = useSWR(`userVerification`, async () => getKyc());

    return { data, error };
}

export function getKyc() {
    return axiosClient.get(`/api/userVerification`, {}).then((response) => {
        return response?.data;
    });
}

export function mutateKyc() {
    mutate("/api/userVerification");
}

export function saveKyc(data) {
    return axiosClient
        .post("/api/userVerification", { ...data })
        .then((response) => {
            return response;
        });
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

export function updateSubCourse(id) {
    return axiosClient
        .put(`/api/admin/subCourses/${id}`, { ...data })
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

export function getUserZodiacs(data) {
    return axiosClient.get("/api/user/zodiacs", {}).then((response) => {
        return response?.data;
    });
}

export function saveUserZodiacs(data) {
    return axiosClient
        .post("/api/user/zodiacs", { ...data })
        .then((response) => {
            return response;
        });
}

export function saveCurrentSign(data) {
    return axiosClient
        .patch("/api/users/currentSign", { ...data })
        .then((response) => {
            return response;
        });
}

export function getSigns() {
    return axiosClient.get(`/api/signs`, {}).then((response) => {
        return response?.data;
    });
}

export function getSubscriptionPlans() {
    return axiosClient.get(`/api/subscriptionPlans`, {}).then((response) => {
        return response?.data;
    });
}

export function getGeneral({ sign }) {
    return axiosClient
        .get(`/api/zodiac/abouts`, {
            params: { sign },
        })
        .then((response) => {
            return response?.data;
        });
}

export function getDaily({ sign, date }) {
    return axiosClient
        .get(`/api/zodiac/daily`, {
            params: { sign, date },
        })
        .then((response) => {
            return response?.data;
        });
}

export function getWeekly({ sign, date }) {
    return axiosClient
        .get(`/api/zodiac/weekly`, {
            params: { sign, date },
        })
        .then((response) => {
            return response?.data;
        });
}

export function getMonthly({ sign, date }) {
    return axiosClient
        .get(`/api/zodiac/monthly`, {
            params: { sign, date },
        })
        .then((response) => {
            return response?.data;
        });
}

export function getMonthlyStatus({ sign, date }) {
    return axiosClient
        .get(`/api/zodiac/monthlyStatus`, {
            params: { sign, date },
        })
        .then((response) => {
            return response?.data;
        });
}

export function getMonthlyTypes() {
    return axiosClient.get(`/api/zodiac/monthlyTypes`, {}).then((response) => {
        return response?.data;
    });
}

export function getYearly({ sign, date }) {
    return axiosClient
        .get(`/api/zodiac/yearly`, {
            params: { sign, date },
        })
        .then((response) => {
            return response?.data;
        });
}

export function saveFeedbacks(data) {
    return axiosClient.post("/api/feedbacks", { ...data }).then((response) => {
        return response;
    });
}

export function getCourseTag() {
    return axiosClient.get(`/api/pub/courses/tags`).then((response) => {
        return response?.data;
    });
}

// required token
export function useProgramDetail(id) {
    const { data, error } = useSWR(`/api/programs/${id}`, (url) => {
        return axiosClient.get(url).then((response) => {
            return response?.data;
        });
    });

    return { data, error };
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

export function patchUserProfile(data) {
    return axiosClient.patch("/api/me/profile", data).then((response) => {
        return response?.data;
    });
}

export function getTestsByBundleId(bundleId) {
    return (
        axiosClient.get <
        ITestData >
        `/api/quizBundles/${bundleId}/quizzes`.then(
            (response) => response?.data.rows
        )
    );
}

export function postUserChoices(data) {
    return axiosClient
        .post("/api/userChoices", { ...data })
        .then((response) => {
            return response?.data;
        });
}

export function updateProgramStep(id, step) {
    return axiosClient
        .patch(`/api/journeys/${id}/users`, { currentStep: step })
        .then((response) => {
            return response?.data;
        });
}
