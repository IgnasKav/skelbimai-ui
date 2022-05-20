const imageArray: string[] = [
  'https://cdn.vox-cdn.com/thumbor/OCYUEEc5odYKWErorN0WNvLa9po=/0x0:2032x1355/1200x800/filters:focal(854x516:1178x840)/cdn.vox-cdn.com/uploads/chorus_image/image/70617253/akrales_210917_4760_0175.0.jpg',
  'https://techuda.com/wp-content/uploads/2022/03/Dell_XPS_13_Plus-1-e1647158175696.jpg',
  'https://s.yimg.com/os/creatr-uploaded-images/2021-10/fc27e1e0-350a-11ec-8d7e-26deaf2f6d2b',
  'https://www.macworld.com/wp-content/uploads/2022/03/14inch-macbook-pro-2022.jpg?quality=50&strip=all',
  'https://www.cnet.com/a/img/resize/5b141ce4fab75bbcbcde562313e06c8fa68432ed/hub/2021/08/26/f37ffcbb-20c0-4ed0-a5c8-69122fddddba/lg-c1-oled-tv-cnet-review-2021-hero.jpg?auto=webp&fit=crop&height=675&precrop=2510,2295,x0,y227&width=1200',
  'https://www.cnet.com/a/img/resize/6b6182d214350aa45c6f6202d15aac6f126bbab7/hub/2019/05/03/5e41f6da-0368-4fa0-99ed-98650c3338cf/03-lg-c9-series-oled-tv-oled65c9p.jpg?auto=webp&fit=crop&height=675&width=1200',
  'https://cdn.mos.cms.futurecdn.net/rPiZ4E3TXHsJg36FEXuzSj.jpg',
  'https://cdn.vox-cdn.com/thumbor/hTme-eHt34ThcGmEwXvp2GMKjhY=/0x0:2040x1360/1320x0/filters:focal(0x0:2040x1360):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/22859879/akrales_210915_4757_0036.jpg',
  'https://s.yimg.com/uu/api/res/1.2/bjmPVioYmfd2SL8cHzoiPQ--~B/aD0xMjc0O3c9MjAwMDthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2022-05/46a65370-cd61-11ec-b927-5462376515d1.cf.jpg',
  'https://helios-i.mashable.com/imagery/articles/05tRBpDuQ90Dj5Puf2kJTUB/hero-image.fill.size_1248x702.v1635263234.jpg',
  'https://static.techspot.com/articles-info/2445/images/alienware-aw3423dw-14.jpg',
  'https://www.kaipkada.lt/wp-content/uploads/2022/02/Samsung-Galaxy-S22-stiprumo-testai.jpg',
  'https://images.indianexpress.com/2022/03/Samsung-Galaxy-S22-Plus-FB.jpg',
  'https://www.trustedreviews.com/wp-content/uploads/sites/54/2022/02/Samsung-Galaxy-S22-scaled.jpeg',
  'https://upload.wikimedia.org/wikipedia/commons/3/33/MQ-9_Reaper_-_090609-F-0000M-777.JPG',
  'https://cdn.vox-cdn.com/thumbor/euk4vKPngEVcdEut6UsGaJtgl7U=/0x0:5917x3907/1200x800/filters:focal(2486x1481:3432x2427)/cdn.vox-cdn.com/uploads/chorus_image/image/70351713/1sN1qEZA.0.jpeg',
  'https://www.ericsson.com/49d423/assets/global/qbank/2021/06/15/drone-with-camera-flying-over-forest-fire-110008403cdb66a1e38821cfd4fd1439a95259.jpg',
  'https://www.rollingstone.com/wp-content/uploads/2021/03/best-action-camera-drones.jpg?resize=1800,1200&w=1800',
  'https://imageio.forbes.com/specials-images/imageserve/6071dceac7ba96e64941c1ef/0x0.jpg?format=jpg&width=1200',
  'https://m-cdn.phonearena.com/images/reviews/235618-image/Apple-iPad-Pro-11-inch-2021-Review-001.jpg',
]

const getRandomInt = () => {
  return Math.floor(Math.random() * imageArray.length)
}

const getRandomImage = () => imageArray[getRandomInt()]

export default getRandomImage
