const sharp=require('sharp');
const path=__dirname+'/';
(async()=>{
 await sharp(path+'olavinlinna-nimet.svg').png().toFile(path+'olavinlinna-lapinakyva.png');
 await sharp(path+'olavinlinna-lapinakyva.png').flatten({background:'#f3e6d0'}).png().toFile(path+'olavinlinna-pergamentti.png');
 await sharp(path+'olavinlinna-pergamentti.png').resize(1536).png().toFile(path+'esikatselu.png');
 console.log('SVG ja kaksi 4096 px PNG-kuvaa viety.');
})();
