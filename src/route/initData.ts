import { getAllUser } from "../data/models/user";
import { getAllArticle } from "../data/models/article";

// import { article } from 'data/mutation/article';


export async function rankAll(limit) {
    const dataUser = await getAllUser() as any
    const dataArticles = await getAllArticle() as any[]
    // best follow 
    // const {idUser , name , avatarLink ,biographical} = dataUser
    // => array inyanfo user 

    const dataFollow = dataUser.map(item => {
        const { idUser, name, avatarLink, biographical } = item
        return {
            count: item.userFollow.length,
            idUser, name, avatarLink, biographical
        }
    })
    const dataCountWriteArticle = dataUser.map(item => {
        const { idUser, name, avatarLink, biographical } = item
        // console.log('item',item)
        return {
            count: item.articles.length,
            idUser, name, avatarLink, biographical
        }
    })
    // console.log('test data',dataArticles[0])
    const dataCountBookMarkArticle = dataArticles.map(item => {
        const { user: { avatarLink, idUser, name }, idArticle , titleArticle, imageArticle, bookmark } = item
        return {
            count: bookmark.length,
            titleArticle,
            imageArticle,
            idArticle,
            user: { avatarLink, idUser, name },
        }
    })
    const rankCountBookMarkArticle = quick_Sort(dataCountBookMarkArticle).slice(-5).reverse()
    // console.log('rankCountBookMarkArticle', rankCountBookMarkArticle)
    // rank follow
    const rankFollow = quick_Sort(dataFollow).slice(-5).reverse()
    // rank count write article
    const rankCountWriteArticle = quick_Sort(dataCountWriteArticle).slice(-5).reverse()
    return {
        rankCountBookMarkArticle,
        rankFollow,
        rankCountWriteArticle
    }
    
}
function quick_Sort(origArray) {
    // console.log('origArray',origArray)
    // return 'ok'
    if (origArray.length <= 1) {
        return origArray
    } else {

        var left = [];
        var right = [];
        var newArray = [];
        var pivot = origArray.pop();
        var length = origArray.length;

        for (var i = 0; i < length; i++) {
            if (origArray[i].count <= pivot.count) {
                left.push(origArray[i]);
            } else {
                right.push(origArray[i]);
            }
        }

        return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
    }
}


    // let dataArticles = await getAllArticle() as any