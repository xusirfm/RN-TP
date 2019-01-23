import tabBar from './tabBar'
import Photo from '@pages/Demo/Photo'
import BottomNav from '@pages/Demo/BottomNav'
export default {
    BottomTab: {
        //头部导航栏页面
        screen: tabBar,
        navigationOptions: () => ({
            //header: null
        })
    },

    /*** 设置 */
    Photo: {
        screen: Photo,
        navigationOptions: () => ({
            title: '设置头像'
        })
    },
    // 聊天页面
    BottomNav: {
        screen: BottomNav,
        navigationOptions: () => ({
            title: '聊天'
        })
    }

}
