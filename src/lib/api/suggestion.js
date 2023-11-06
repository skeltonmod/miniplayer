import { Innertube } from 'youtubei.js/web';

/**
 * @param {string} query
 * 
 * 
 */
async function search(query){
    const yt = await Innertube.create();

    // try{
    //     const search_result = await yt.getSearchSuggestions(query);
    //     if(!search_result){
    //         return {
    //             error: 'no result found',
    //             status: 404
    //         }
    //     }


    //     return search_result;
    // }catch(error){
    //     console.error(error);

    //     return {
    //         error: 'Internal Server Error',
    //         status: 500,
    //         message: error
    //     }
    // }
}

export default search;