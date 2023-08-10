import useSWR, { mutate } from 'swr';
import { isUserLoggedIn } from './auth';
import {
    getAuctionBids,
    getProductById,
    getUserProfile,
    getAdminProfile,
    getProducts,
} from './service';

// return user profile if user logged in
export function useUserProfile(userId) {
    //useSWR cache user information once and use it anywhere
    //when it comes to change mutate function used
    const { data, error } = useSWR(`/api/admin/profile/${userId}`, async () =>
        getUserProfile(userId)
    );

    if (!isUserLoggedIn())
        return { data: undefined, loading: false, error: undefined };

    return { data, loading: !data && !error, error };
}

export async function mutateProfile() {
    mutate('/api/admin/profile/1');
}

export function useProfileById(userId) {
    const { data, error } = useSWR(`/api/admin/profile/${userId}`, async () =>
        getUserProfile(userId)
    );
    return { data, loading: !data && !error, error };
}

export function mutateUserProfile(id) {
    mutate(`/api/admin/profile/${id}`);
}

// return user profile if user logged in
export function useAdminProfile() {
    //useSWR cache user information once and use it anywhere
    //when it comes to change mutate function used
    const { data, error } = useSWR(`/api/admin/profile/${userId}`, async () =>
        getUserProfile(userId)
    );

    if (!isUserLoggedIn())
        return { data: undefined, loading: false, error: undefined };

    return { data, loading: !data && !error, error };
}

export function mutateAdminProfile(id) {
    mutate(`/api/admin/profile/${id}`);
}

export function useAuctionBids(
    auctionId,
    { page = 0, perPage = 100, sort = ['createdAt', 'DESC'] }
) {
    const { data, error } = useSWR(
        `/api/auctions/${auctionId}/bids/${perPage}/${page}/${sort?.join('/')}`,
        (key) => {
            return getAuctionBids(auctionId, { page, perPage, sort });
        }
    );

    return { data, error };
}

// export function useAuctionBids(productId) {
//     const { data, error } = useSWR(`/api/auctions/${productId}/bids`, () => {
//         return getAuctionBids(productId)
//     })

//     return { data, error }
// }
export function useProducts() {
    const { data, error } = useSWR(
        `/api/productCollections/1/product`,
        async () => getProducts()
    );

    return { data, loading: !data && !error, error };
}
