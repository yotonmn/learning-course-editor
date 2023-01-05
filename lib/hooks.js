import useSWR, { mutate } from "swr";
import { isUserLoggedIn } from "./auth";
import {
    getAuctionBids,
    getProductById,
    getUserProfile,
    getAdminProfile,
} from "./service";

// return user profile if user logged in
export function useUserProfile() {
    //useSWR cache user information once and use it anywhere
    //when it comes to change mutate function used
    const { data, error } = useSWR("/api/admin/profile/1", getUserProfile);

    if (!isUserLoggedIn())
        return { data: undefined, loading: false, error: undefined };

    return { data, loading: !data && !error, error };
}

export function mutateUserProfile() {
    mutate("/api/admin/profile/1");
}

export async function mutateProfile() {
    mutate("/api/admin/profile/1");
}

// return user profile if user logged in
export function useAdminProfile() {
    //useSWR cache user information once and use it anywhere
    //when it comes to change mutate function used
    const { data, error } = useSWR("/api/admin/profile/1", getAdminProfile);

    if (!isUserLoggedIn())
        return { data: undefined, loading: false, error: undefined };

    return { data, loading: !data && !error, error };
}

export function mutateAdminProfile() {
    mutate("/api/admin/profile/1");
}

export function useAuctionBids(
    auctionId,
    { page = 0, perPage = 100, sort = ["createdAt", "DESC"] }
) {
    const { data, error } = useSWR(
        `/api/auctions/${auctionId}/bids/${perPage}/${page}/${sort?.join("/")}`,
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

export function mutateAuctionBids(
    productId,
    { page = 0, perPage = 100, sort = ["createdAt", "DESC"] }
) {
    mutate(
        `/api/auctions/${productId}/bids/${perPage}/${page}/${sort?.join("/")}`
    );
}

export function useProductById(id) {
    const { data, error } = useSWR(`/api/products/${id}`, async () =>
        getProductById(id)
    );

    return { data, loading: !data && !error, error };
}

export function mutateProductById(productId) {
    mutate(`/api/products/${productId}`);
}
