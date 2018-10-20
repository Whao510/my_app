
//配置服务器代理
const proxy_table = {
    'mz': 'https://m.maizuo.com',
    'wy':'https://www.muji.com.cn'
}
const proxy = {}

for (const key in proxy_table) {
    if (proxy_table.hasOwnProperty(key)) {
        proxy['/' + key] = {
            target: proxy_table[key],
            changeOrigin: true,
            pathRewrite: {
                ['^/' + key] : ''
            }
        }
    }
}
module.exports = proxy