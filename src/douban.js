const axios = require('axios');
const config = require("./config");


const USERID = config.get("userid");  // 豆瓣用户 id。目前只支持整数型 id, 字母型的 id，可以通过头像图片链接来找到其整数型 id，图片命名规则ul[uid]-*.jpg
const SCKEY = config.get("sckey");  // Server 酱申请的 SCKEY，申请地址：http://sc.ftqq.com/3.version
const CYCLETIME = 5 * 1000;  // 循环周期，时间单位毫秒

let lastPubDate;
setInterval(main, CYCLETIME);

function main() {
    const url = `https://m.douban.com/rexxar/api/v2/status/user_timeline/${USERID}?max_id=&ck=eUUA&for_mobile=1`;
    const instance = axios.create({
        timeout: 10000,
        headers: {
            Referer: `https://m.douban.com/people/${USERID}/statuses`,
        },
    });
    instance.get(url).then((res) => {
        const lastItem = res.data.items[0];
        const content = getContentByActivity(lastItem.status);
        const post = {
            title: content.title,
            text: content.text,
            desc: content.desc,
            date: lastItem.status.create_time,
            link: lastItem.status.sharing_url,
        };
        if (lastPubDate !== post.date) {
            sendToWechat(post);
            lastPubDate = post.date;
        } else {
            console.log(`死舔狗，该干嘛干嘛去，现在没得舔。—— ${new Date()}`);
        }
    }).catch((error) => {
        console.log(`${error} —— ${new Date()}`);
    })
}

function getContentByActivity(status) {
    let [title, text, desc] = ['', '', ''];
    switch (status.activity) {
        case '说':
            title = `${status.author.name} ${status.activity}`;
            text = status.text;
            break;
        case '转发':
            title = `${status.author.name} ${status.activity} ${status.reshared_status.author.name} 的广播：`;
            text = status.reshared_status.text;
            desc = getContentByActivity(status.reshared_status).title;
            break;
        default:
            if (status.card) {
                if (status.card.rating) {
                    title = `${status.author.name} ${status.activity}《${status.card.title}》`;
                    text = status.text;
                    desc = `《${status.card.title}》评分：${status.card.rating} ${status.card.subtitle}`;
                } else {
                    title = `${status.author.name} ${status.activity}「${status.card.title}」`;
                    text = status.text;
                    desc = `${status.card.title} ${status.card.subtitle}`;
                }
            }
            break;
    }
    return { title, text, desc };
}

function sendToWechat(post) {
    const params = {
        text: `${post.title}:`,
        desp: `【${post.text.replace(/[\r\n]/g, '')}】 [${post.date}] [[${post.link}](${post.link})]`
    };
    const url = `https://sc.ftqq.com/${SCKEY}.send?text=${encodeURIComponent(params.text)}&desp=${encodeURIComponent(params.desp)}`;
    axios.get(url).then((res) => {
        console.log(`${JSON.stringify(res.data)} —— ${new Date()}`);
    }).catch((error) => {
        console.log(`${error} —— ${new Date()}`);
    });
}
