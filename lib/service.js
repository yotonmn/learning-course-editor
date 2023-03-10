import useSWR, { mutate } from 'swr';
import axiosClient from './axios';

export function register(data) {
    return axiosClient
        .post('/api/users/register', { ...data })
        .then((response) => {
            return response;
        });
}

export function login(data) {
    return axiosClient
        .post('/api/users/login', { ...data })
        .then((response) => {
            return response;
        });
}

export function forgotPassword(data) {
    return axiosClient
        .post('/api/user/forgot-password', { ...data })
        .then((response) => {
            return response;
        });
}

export function resetPassword(data) {
    return axiosClient
        .post('/api/user/reset-password', { ...data })
        .then((response) => {
            return response;
        });
}

export function savePhoneNumber(data) {
    return axiosClient
        .post('/api/me/phoneNumber', { ...data })
        .then((response) => {
            return response;
        });
}

export function verifyPhoneNumber(data) {
    return axiosClient
        .post('/api/me/phoneNumber/verify', { ...data })
        .then((response) => {
            return response;
        });
}

//dynamic bolgoh
export function getUserProfile(id) {
    return axiosClient.get(`/api/admin/profile/${id}`).then((response) => {
        return response?.data;
    });
}

//dynamic bolgoh
export function updateUserProfile(data) {
    return axiosClient
        .put(`/api/users/profile`, { ...data })
        .then((response) => {
            return response;
        });
}

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

export function mutateCourseById(id) {
    mutate(`/api/courses/${id}`);
}

export function getSubCourseById(id) {
    return axiosClient.get(`/api/subCourses/${id}`).then((response) => {
        return response?.data;
    });
}

export function getSubCourseByIdAdmin(id) {
    return axiosClient.get(`/api/admin/subCourses/${id}`).then((response) => {
        return response?.data;
    });
}

export function mutateSubCourseById(id) {
    mutate(`/api/subCourses/${id}`);
}

export function useSubCourseById(id) {
    const { data, error } = useSWR(`/api/subCourses/${id}`, async () =>
        getSubCourseById(id)
    );

    return { data, loading: !data && !error, error };
}

export function useSubCourseByIdAdmin(id) {
    const { data, error } = useSWR(`/api/admin/subCourses/${id}`, async () =>
        getSubCourseByIdAdmin(id)
    );

    return { data, loading: !data && !error, error };
}

export function getSubcourseCompletionById(id) {
    return axiosClient.get(`/api/courses/${id}/complete`).then((response) => {
        return response?.data;
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

export function deleteCourseById(id) {
    return axiosClient.delete(`/api/admin/courses/${id}`).then((response) => {
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

export function enrollCourse(id) {
    return axiosClient.post(`/api/courses/${id}`).then((response) => {
        return response;
    });
}

export function getEnrolledCourses() {
    return axiosClient.get(`/api/courses/enrolledCourses`).then((response) => {
        return response;
    });
}

export function useCourseEnrolled() {
    const { data, error } = useSWR(`/api/courses/enrolledCourses`, async () =>
        getEnrolledCourses()
    );

    return { data, loading: !data && !error, error };
}

export function getSingleCourseEnrolled(id) {
    return axiosClient.get(`/api/courses/${id}/enrollment`).then((response) => {
        return response;
    });
}
export function useSingleCourseEnrolled(id) {
    const { data, error } = useSWR(`/api/course/${id}/enrollment`, async () =>
        getSingleCourseEnrolled(id)
    );

    return { data, loading: !data && !error, error };
}

export function getCourseCompleted(id) {
    return axiosClient.get(`/api/courses/${id}/complete`).then((response) => {
        return response;
    });
}

export function useCourseCompleted(id) {
    const { data, error } = useSWR(`/api/courses/${id}/complete`, async () =>
        getCourseCompleted(id)
    );

    return { data, error };
}

export function submitSubcourse(id, formData) {
    return axiosClient
        .post(`/api/subCourses/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            return response;
        });
}

export function saveEmail(data) {
    return axiosClient.post('/api/me/email', { ...data }).then((response) => {
        return response;
    });
}

export function verifyEmail(data) {
    return axiosClient
        .post('/api/me/email/verify', { ...data })
        .then((response) => {
            return response;
        });
}
export function getVerifyCode() {
    return axiosClient.get('/api/refreshVerifyToken').then((response) => {
        return response;
    });
}
export function updateWalletAddress(data) {
    return axiosClient
        .put(`/api/users/walletAddress`, { ...data })
        .then((response) => {
            return response;
        });
}

export function createCertificate(id, data) {
    return axiosClient
        .post(`/api/courses/${id}/certificate`, { ...data })
        .then((response) => {
            return response;
        });
}

export function getCourseGraduated(id) {
    return axiosClient
        .get(`/api/courses/graduatedCourses/${id}`)
        .then((response) => {
            return response;
        });
}

export function useCourseGraduated(id) {
    const { data, error } = useSWR(
        `/api/courses/graduatedCourses/${id}`,
        async () => getCourseGraduated(id)
    );

    return { data, error };
}

export function getRegisterAirdrop() {
    return axiosClient.get(`/api/users/registerAirdrop`).then((response) => {
        return response;
    });
}

export function getTransactionHistory() {
    return axiosClient.get(`/api/users/transactioHash`).then((response) => {
        return response;
    });
}

export function getProducts() {
    return axiosClient
        .get(`/api/productCollections/1/product`)
        .then((response) => {
            return response;
        });
}

export function createProduct(data) {
    return axiosClient
        .post('/api/admin/products', { ...data })
        .then((response) => {
            return response;
        });
}
