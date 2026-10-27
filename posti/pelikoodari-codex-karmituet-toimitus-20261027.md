# Codex → Pelikoodari: karmitukikäännökset molemmille Puyi-malleille, 27.10.2026

#1035 valmis tekniseen vastaanottoon: `door_grab_left` ja `door_grab_right`, 0,70s, perus- ja viitta-Puyi. Keisari ottaa yhdellä kädellä tukea paljaasta karmin kulmasta, kääntyy90° ja jatkaa juoksua. Lähteet, aiemmat ehdokkaat ja kaikki aiemmat liiketyypit säilytetty. Ei uusia Tripo-kutsuja/krediittejä.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/door-grab-review-v1`. GLB:t `models/puyi-perus.glb` (14.881Mt, 50leikettä) ja `models/puyi-viitta.glb` (14.390Mt, 41leikettä). GLB:t vain paikallisesti, tarkisteet `SHA256SUMS`. Mukana kahdeksan kuvasarjaa takaa yläviistosta ja etuviistosta, QA, MANIFEST, CONTROLLER-CONTRACT ja juurikäyrien CSV.

**Ohjaimelle:** käytä sekä juuren siirtymää että yaw-kiertoa samasta kellosta. Kierto ei ole leivottu Hipsiin. Kämmenen sijasta todellinen sormenpäiden tukikohta on `[sign*0.35,1.0,0.8]`m, missä left=+1,right=-1. Kosketus0,10–0,54s, irrotus loppuu0,64s. Loppujuuri `[sign*1.15,0,1.15]`, uusi suunta±90°, poistumisnopeus5m/s, juoksuvaihe1,33s modulo run-kesto. Älä lisää tavallista eteenpäinliikettä päälle tai nollaa lopun suuntaa. Tarkat käyrät sopimuksessa.

Lopulliset GLB:t tarkistettu1920Hz (1 345ruutua/liike): todellisen sormipinnan suurin ankkuripoikkeama 0.046mm, jalan suurin tukipoikkeama 0.117mm. Verkon alin piste vähintään 0.986mm lattian yläpuolella. Prototyypin8×8cm karmin kärkitestin suurin läpäisy 0.015mm. Tämä ei ole jatkuva kolmioiden törmäystesti eikä pelin todellisen karmin hyväksyntä.

V6 korjaa avainruutujen välisen kyynärvarren kierron nykäyksen. Viitan sisempi alareuna väistää karmia liikkeen poistumisessa. Geometria, luuranko ja tekstuurit tarkistettu täsmälleen lähteiden mukaisiksi. Kumulatiivisten liikkeiden avaimia on pakattu; mitattu suurin verkkomuutos 0.090mm. Samplerien jakaminen on häviötöntä. Perusmallin välivaiheen kompaktiraportin FAIL koskee vain välivaiheen kokoa; lopullinen tiedosto alittaa15Mt ja kaikki liikeportit läpäistiin.

**Vastaanottotarkistus tarvitaan:** oikean paljaan karmin kohdistus, seinä-/ovipalkkiosumat, pelin häivytykset ja käden tukiasennon luettavuus pelikamerassa. Ote on sormenpäiden tuki kulmaan, ei paksun pylvään ympäri puristuva käsi. Täysi viitan hiha/kainalo-korjaus on edelleen avoin. Tämä toimitus ei väitä peli-integraatiota tai KK:n kuvahyväksyntää.

Seuraavaksi käsittelen uudet #1145–1148 rimpuilukorjaukset nykyisillä lähteillä. Katson vastaanottajan videon ja pidän takaa-pidon pelikytkennän ennallaan.
