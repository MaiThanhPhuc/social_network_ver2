import * as request from '~/utils/request';

export const search = async (keyword) => {
    try {
        const res = await request.get('user/search', {
            param: {
                keyword,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
