# Pulu (Livia) — 70 pelieleen laukaisijataulukko

Laitteistotestaajan (QA) analyysi Codexin pyyntöön
(`posti/codex-fable-pulun-idle-qa-vastaus-20260923.md`). Tuotos ei ole
koodimuutos. `LIVIAN_UUDET_PELIELEET` (js/livia-uudet-versiot.js:398-400) on
sama 70 ID:n taulukko kuin `LIVIA_SVG_ELEET` (js/livia-svg.js), joka koostuu
kolmesta osasta:

- 51 vanhaa pikselielettä (`js/livia-pikselit.js` `LIVIA_PIX_ELEET`)
- 9 "Liike/Pelitilanne/Puhe"-lisäystä (js/livia-svg.js rivit 6-14)
- 10 "Pelitilanne"-lisäystä (js/livia-svg.js rivi 15, `smile…chuckle`)

Jokaisella 70 ID:llä voi olla useampi laukaisureitti (esim. `think` sekä
chat-odotuksen täytelauseesta että ajastimen odotuskierrosta). Taulukossa
mainitaan tärkein/ensisijainen reitti ja tarvittaessa muut. `toista(id,…)`
(js/livia-eleet.js:331) on ainoa paikka joka todella käynnistää eleen
piirron; jos mikään koodipolku ei koskaan kutsu sitä kyseisellä ID:llä
pelin sisältä, ele on merkitty orvoksi.

Legenda "Odotettu yleisyys":
- **jatkuva idle** — osa `LIVIAN_RAUHALLISET_TAUSTAELEET`-kierrosta (8 kpl,
  js/livia-eleet.js:95), valitaan aina kun pulu on ollut 30 s hiljaa.
- **satunnainen idle** — kontekstisidonnainen idle-vuorottelu (vain lehti
  auki, 22 s väli).
- **tapahtumapohjainen-yleinen** — laukeaa säännöllisesti normaalissa
  pelaamisessa (chat, visa, lehti, luenta, kortit).
- **tapahtumapohjainen-harvinainen** — kapea avainsana/kynnys tai
  tarkoituksella harvinainen (esim. 1/7-laskuri, kertaostoslippu).
- **vain suoralla toista()-kutsulla** — ohittaa `tilanne()`-reitityksen
  kokonaan, kutsutaan julkisesta rajapinnasta.

## Taulukko

| Ele-ID | Ryhmä | Semanttinen laukaisija | Yleisyys | Toistettava testi |
|---|---|---|---|---|
| blink | Pieni ele | Idle-kierto (`valitseLivianTaustaEle`, eleet.js:96) | jatkuva idle | Jätä peli 30–40 s koskematta pulun ollessa levossa; katso että blink esiintyy kierrossa muiden 7 kanssa. |
| glance | Pieni ele | Idle-kierto; myös `livianMietintaEle` oletuspaluu (eleet.js:45) | jatkuva idle | Sama 30 s -odotus; tarkista lisäksi että tuntematon chat-täytelause antaa `glance`-eleen. |
| turn | Pää | Idle-kierto | jatkuva idle | 30 s odotus, katso `turn` kierrossa. |
| lookRight | Pää | Chat-täytelause "Katson tästä ikkunasta.." (eleet.js:44,581) tai odotuskierron 2/3-vuoro | tapahtumapohjainen-yleinen | Avaa chat, kysy jotain niin että vastaus viipyy >8 s; katso `lookRight` odotuskierrossa (`think/lookRight/reading`). |
| lookUp | Pää | Idle-kierto; myös luennan ensimmäinen rivi (`luoLivianKuunteluvuoro`, tilanteet.js:109) ja tunnetagi `utelias` | jatkuva idle | 30 s odotus TAI aloita matkakirjan luenta ja katso ensimmäinen ele = `lookUp`. |
| lookDown | Pää | Idle-kierto | jatkuva idle | 30 s odotus, katso `lookDown` kierrossa. |
| tilt | Pää | Idle-kierto; myös `livianAiheEle` oletus eläin/luonto-kortille (tilanteet.js:86-87) | jatkuva idle | 30 s odotus TAI avaa eläin-aiheinen fokusnosto-kortti jossa ei ole lintu/hevonen-sanaa. |
| nod | Pää | Visa/tehtävä epäonnistuu (`ilmoitaLivianTilanne('retry')`, visa.js:163); myös reaktiotagi `myotailee`; sentimenttiteksti "kyllä kyllä" | tapahtumapohjainen-yleinen | Vastaa visakysymykseen väärin ja katso `retry`→`nod`. |
| shake | Pää | Reaktiotagi `epailee`/`torjuu` narratiossa tai puhecuessa; sentimentti "väärin" | tapahtumapohjainen-yleinen | Kelaa matkakirjan luentaa kohtaan jossa on `epailee`/`torjuu`-tagattu reaktio (luentareaktiot.js) ja katso `shake`. |
| doubleTake | Pää | Reaktio/puhecue `hammastyy` voimakkuus<0.65; kortti eläin+"hevonen"; tunnetagi `jannitys` | tapahtumapohjainen-harvinainen | Avaa hevos-aiheinen elaintaky-kortti ja katso `doubleTake` (ei `grin`). |
| shock | Ilme | Pulun oman repliikin sentimentti "kääk/apua!/kauhist/hui!" (eleet.js:49) | tapahtumapohjainen-harvinainen | Etsi tarinatekstistä repliikki jossa on "Kääk!" ja käynnistä se kuplana; katso `shock`. |
| embarrassed | Ilme | Sentimentti "en minä/nolo/anteeksi/hups/vahingossa/minun vika" (eleet.js:52) | tapahtumapohjainen-harvinainen | Sama menetelmä sopivalla repliikillä. |
| angry | Ilme | Sentimentti "pah!/kehtaa/tuoht/hävy/epäreilu/suut" (eleet.js:54) | tapahtumapohjainen-harvinainen | Sama menetelmä. |
| bored | Ilme | Sentimentti "pitkäst/kylläst/odotellaan/taasko" (eleet.js:56) | tapahtumapohjainen-harvinainen | Sama menetelmä. |
| puff | Ilme | Sentimentti "pöh/puh!/posk/pier" (eleet.js:57) | tapahtumapohjainen-harvinainen | Sama menetelmä. |
| manic | Ilme | Sentimentti pulla+"tuijot/näen/tuoksu/pulla ensin" (eleet.js:51); lehden ruoka-aihe (livia-lehtireaktiot.js:88) | tapahtumapohjainen-yleinen | Selaa isoisän lehteä ruoka-aiheiselle sivulle; katso `manic`. |
| expert | Ilme | Sentimentti "tiedän/asiantuntija/tietenkin/kuulehan"; kortin `kauppa`-aihe; tunnetagi `ylpea` | tapahtumapohjainen-yleinen | Avaa kauppa-aiheinen fokusnosto-kortti; katso `expert`. |
| disbelief | Ilme | Sentimentti "en voi uskoa/ei voi olla/uskomaton/oikeastiko"; reaktio/puhecue `hammastyy`≥0.65; kortin `huuto`/`ihme`-aihe; tunnetagi `hammastys` | tapahtumapohjainen-yleinen | Avaa `huuto`- tai `ihme`-symbolin kortti; katso `disbelief`. |
| confused | Ilme | Monta mietintä-täytelausetta (esim. "kartta on väärinpäin"); sentimentti "en tiedä/mitähän/kummall/häh"; tunnetagi `hammentynyt`; `virhereaktio()` (pollo.js:6298) | tapahtumapohjainen-yleinen | Pakota chat-virhe (esim. katkaise verkko kesken kysymyksen) ja katso `error`→`confused`. |
| happy | Ilme | **EI LÖYDETTYÄ LAUKAISIJAA (orpo?)** — ei esiinny missään `livianRepliikinEle`/`livianMietintaEle`/`LIVIAN_TUNTEET`/`livianAiheEle`/reaktiokartassa | — | Ei toistettavaa testiä: grep koko repo `'happy'`-literaalille löytää vain määrittelyt (livia-pikselit.js, PROFIILIT-liikeprofiili), ei yhtään kutsupaikkaa eikä testiä. |
| love | Ilme | Sentimentti "aivan tavallinen/ihast/rakas/rakast/sydämeni"; valokuva Venetsiassa (`laji==='photo'`, eleet.js:523); tunnetagi `rakkaus` | tapahtumapohjainen-yleinen | Ota valokuva Venetsian kaupunkinäkymässä (fokusvirta.js:2443) ja katso `love` (ei `present`). |
| facepalm | Ilme | **EI LÖYDETTYÄ LAUKAISIJAA (orpo?)** — sama tilanne kuin `happy` | — | Ei toistettavaa testiä; ei kutsupaikkaa eikä testiä koko repossa. |
| talk | Puhe | **EI KOSKAAN OMANA ELEENÄ.** Käytetään vain nokan aukion muodon lähteenä puheen aikana: `livianSvgAsento('talk', vaihe).frame` (eleet.js:297), ei koskaan `toista('talk',…)`. | — | Ei toistettava pelieleenä; nokan liike näkyy aina kun pulu puhuu (kupla/chat), mutta se ei ole tämä ele valittuna `toista()`-kutsulla. Katso koodihuomio taulukon alla. |
| listen | Puhe | Mikrofonin avaus (`laji==='microphone'`, eleet.js:524); useita mietintälauseita; tunnetagi `vakava`; reaktio `vakavoituu`; kortin oletus | tapahtumapohjainen-yleinen | Avaa chat ja paina mikrofonipainiketta; katso `listen`. |
| think | Puhe | Chat-odotuksen oletus-täyteele kun mikään muu ei sovi (`livianMietintaEle` paluu useimmille "hetki, mietin"-lauseille); odotuskierron 1. vuoro; tunnetagi `miettiva` | tapahtumapohjainen-yleinen | Kysy pöllöltä mikä tahansa kysymys; jos vastaus viipyy, katso `think`. |
| reading | Puhe | Mietintälause "luen pienellä painetun/käsiala on kanan"; odotuskierron 3. vuoro | tapahtumapohjainen-yleinen | Odota chat-vastausta niin pitkään että odotuskierto ehtii kolmanteen vuoroon (~24 s); katso `reading`. |
| crumb | Touhu | Mietintälause "pulla suussa"/"murut pois kirjan päältä"/"pulla ensin ja tieto sitten" | tapahtumapohjainen-yleinen | Sama chat-odotus, riittävän monta kysymystä kunnes joku täytelause osuu; katso `crumb`. |
| bread | Touhu | Pulun oman repliikin sentimentti "pulla/pullaa/pullan/muru" (ei "tuijottaa"-lisäehtoa) | tapahtumapohjainen-yleinen | Käynnistä repliikkikupla jossa mainitaan pulla ilman "tuijottaa/näen/tuoksu"-sanoja; katso `bread`. |
| preen | Touhu | Idle-kierto; mietintälause "sulka jäi mustepulloon"/"untuvia sähkekoneessa" | jatkuva idle | 30 s odotus, katso `preen` kierrossa. |
| yawn | Touhu | Sentimentti "nuk/uness/väsyt" | tapahtumapohjainen-harvinainen | Käynnistä repliikkikupla jossa mainitaan väsymys/uni; katso `yawn`. |
| sleep | Touhu | 3 min (180000 ms) täysi passiivisuus (eleet.js:585) | tapahtumapohjainen-harvinainen | Jätä peli auki 3+ min koskematta mihinkään; katso pulun nukahtavan (`frame:'sleep'`). |
| wake | Touhu | Käyttäjä koskettaa/klikkaa pelin jotain elementtiä pulun ollessa unessa (`toiminta()`, eleet.js:591) | tapahtumapohjainen-harvinainen | Odota edellinen `sleep`-tila, klikkaa mitä tahansa; katso `wake`. |
| sneeze | Touhu | Yksittäinen mietintälause "Arkistossa oli enemmän pölyä kuin muistin" | tapahtumapohjainen-harvinainen | Vaatii juuri tämän chat-täytelauseen osumisen; katso `sneeze`. |
| wind | Touhu | Mietintälauseet "lento vastatuuleen"/"tuuli vei yhden sivun"/"vastatuuli oli luvattua kovempi"; sentimentti "tuuli/mistral" | tapahtumapohjainen-yleinen | Chat-odotus tai repliikki jossa mainitaan tuuli; katso `wind`. |
| rain | Touhu | Mietintälause "siivet ovat vielä märät sateesta"; sentimentti "sade/sataa/märkä" | tapahtumapohjainen-yleinen | Repliikki jossa mainitaan sade; katso `rain`. |
| sun | Touhu | Sentimentti "aurinko/häikäis" | tapahtumapohjainen-harvinainen | Repliikki jossa mainitaan aurinko/häikäisy; katso `sun`. |
| snow | Touhu | Sentimentti "lum/hiutale" | tapahtumapohjainen-harvinainen | Repliikki jossa mainitaan lumi; katso `snow`. |
| flyAway | Liike | Yleisin mietintälaukaisija (n. 10 eri "käyn kysymässä pöllöltä" -lausetta); myös chat-lähtö kun `livianMietintaEle`=`flyAway` (`pinkaiseChatista`) | tapahtumapohjainen-yleinen | Kysy pöllöltä kysymys jonka vastaus viipyy; katso pulun "lähtevän" (`flyAway`) ennen paluuta. |
| flyBack | Liike | `palaa()`-paluu lennosta, 6/7 kerroista (eleet.js:533) | tapahtumapohjainen-yleinen | Käynnistä mikä tahansa lento-ele ja keskeytä se (esim. avaa chat); katso paluun olevan `flyBack` useimmiten. |
| clumsyLand | Liike | Pulun nappi tulee uudelleen näkyviin (`saapuminen()`, eleet.js:594), 6/7 kerroista, EI ensimmäinen kerta | tapahtumapohjainen-yleinen | Sulje ja avaa dialogi joka piilottaa/näyttää pulun napin uudelleen (esim. kortti); katso `clumsyLand` useimmiten. |
| glassCrash | Liike | Sama kuin `flyBack`/`clumsyLand`, mutta joka 7. kerta (`++paluuVuoro%7===0`) | tapahtumapohjainen-harvinainen | Toista näkyvyyden vaihto/paluu 7 kertaa peräkkäin; seitsemäs on `glassCrash`. Tarkoituksella harvinainen. |
| walkRight | Liike | **EI LÖYDETTYÄ LAUKAISIJAA (orpo?)** — koodikommentti (linssit/ihmisen-matka-esitys.js:452) kuvaa sen `walkBack`:n käsitteelliseksi vastapariksi ULOS-suuntaan, mutta mikään tiedosto ei kutsu `toista('walkRight',…)`. Ainoat osumat ovat tests/livia-eleet.test.mjs ja tests/livia-pikselit/-svg.test.mjs suorat testikutsut. | — | Ei toistettavaa pelitestiä. Vahvistus: `grep -rn "toista('walkRight'" js/` löytää nollaa osumaa pelikoodista. |
| walkBack | Liike | `palaa()`-paluu kävelystä; SUORA kutsu `js/linssit/ihmisen-matka-esitys.js:1987` pulun saapuessa "Ihmisen matka" -esityksen näyttämölle (`PULUN_SISAANTULOELE`) | tapahtumapohjainen-yleinen | Avaa "Ihmisen matka" -linssi/esitys ja katso pulun kävelevän sisään oikealta (`walkBack`). |
| peek | Liike | Mietintälauseet "kaivan sähkeitä"/"arkiston hyllyt ovat minua korkeammalla"/"tästä on jossain sähke" | tapahtumapohjainen-yleinen | Chat-odotus kunnes osuu arkisto/sähke-aiheinen täytelause; katso `peek`. |
| owl | Liike | **EI LÖYDETTYÄ LAUKAISIJAA (orpo?).** `toista()`-funktio (eleet.js:332) aliasoi JOKAISEN `'owl'`-kutsun heti `'flyAway'`:ksi ennen suoritusta (`if(id==='owl')id='flyAway';`), joten oma piirto ei koskaan näy pelissä vaikka geometria on olemassa. Huom: js/livia-kasvot.js:n `'owl'` on ERI, pollon pään ikoni-tila — ei sama asia. | — | Ei toistettavaa: mikä tahansa yritys näyttää `owl` päätyy aina näyttämään `flyAway`. Vahvistettu myös tests/livia-eleet.test.mjs:ssä epäsuorasti (owl-baseId geometriaa testataan vain `livianPikseliAsento`-tasolla, ei `toista()`-tasolla). |
| arrive | Liike | **EI LÖYDETTYÄ LAUKAISIJAA (orpo?).** Vain `palaa()`-paluulogiikan varalauseke `else if(s?.x>0)toista('arrive')` (eleet.js:534), mutta mikään ele ei koskaan aseta `x>0`-tilaa ilman että kyseinen lähde-ele (`leaveRight`/`walkRight`, myös orpoja) olisi ensin käynnistynyt. | — | Ei toistettavaa pelitestiä; vaatisi ensin orvon `leaveRight`/`walkRight`-tilan. |
| crash | Liike | **EI LÖYDETTYÄ LAUKAISIJAA (orpo?).** Ei yhtään kutsupaikkaa `js/`-pelikoodissa; ainoa `toista('crash')`-kutsu koko repossa on tests/livia-eleet.test.mjs:257 (reduced-motion-testi). | — | Ei toistettavaa pelitestiä. Yllättävä löydös: näyttää "käytössä olevalta" koska sillä on täysi geometria ja testikattavuus, mutta testi kutsuu sitä vain suoraan `toista('crash')`, ei minkään oikean pelitapahtuman kautta. |
| emerge | Liike | **EI LÖYDETTYÄ LAUKAISIJAA (orpo?).** Vain `palaa()`-varalauseke `else if(s?.y>5)toista('emerge')`, sama ongelma kuin `arrive` (lähde `leaveDown` on itsekin orpo). | — | Ei toistettavaa pelitestiä. |
| leaveRight | Liike | **EI LÖYDETTYÄ LAUKAISIJAA (orpo?).** Ei kutsupaikkaa `toista('leaveRight',…)` missään js/-tiedostossa. | — | Ei toistettavaa pelitestiä. |
| leaveDown | Liike | **EI LÖYDETTYÄ LAUKAISIJAA (orpo?).** Ei kutsupaikkaa `toista('leaveDown',…)` missään js/-tiedostossa. | — | Ei toistettavaa pelitestiä. |
| handoff | Liike | Pulun NAPPI tulee ensimmäistä kertaa näkyviin koko sessiossa (`saapuminen()`, `!ensisaapuminen`, eleet.js:594) — "pöllön sijainen" | tapahtumapohjainen-harvinainen | Lataa peli tyhjästä tilasta ja katso ensimmäinen pulun ilmestyminen ruudulle: sen pitää olla `handoff`, ei `clumsyLand`. |
| glideIn | Liike | Julkinen `ensiliito()`-rajapinta (eleet.js:688-692), kutsutaan pollo.js:7356:sta kun pulu avataan ensi kertaa sivulle | vain suoralla toista()-kutsulla | Lataa peli ja katso pulun ensimmäistä liitoa ruudulle sisään (`glideIn`), ennen kuin mitään muuta tapahtuu. |
| trailerFlee | Liike | Saapumistrailerin "kirjaimet"-vaihe alkaa (saapumistraileri.js:314) | tapahtumapohjainen-yleinen | Matkusta uuteen kaupunkiin niin että saapumistraileri käynnistyy; katso pulun väistävän (`trailerFlee`). |
| trailerBack | Liike | Saapumistraileri päättyy (saapumistraileri.js:679, `vaihe:'loppu'`) TAI aloituslennon paluu (`palaaAlkulennosta`) | tapahtumapohjainen-yleinen | Anna saapumistrailerin loppua kokonaan; katso pulun palaavan (`trailerBack`). |
| chatDashOut | Liike | Chat-vastausta odottaessa mietintälause tulkitaan `flyAway`:ksi (`pinkaiseChatista`, eleet.js:176-181) | tapahtumapohjainen-yleinen | Kysy chatissa kysymys ja katso pulun "syöksyvän pois" chatista odotuksen ajaksi. |
| chatDashBack | Liike | Chat-vastaus saapuu (`chatVastaus`, eleet.js:182-197) | tapahtumapohjainen-yleinen | Sama tilanne, odota vastaus; katso paluu (`chatDashBack`). |
| chatDustOff | Pelitilanne | Heti `chatDashBack`-eleen jälkeen, ennen `bookStudy`a (eleet.js:194) | tapahtumapohjainen-yleinen | Sama chat-vastaustilanne; katso lyhyt "pölyjen pudistus" ennen kirjan selausta. |
| mapPeck | Pelitilanne | Idle-kierto (SAMA 8-joukko kuin blink/turn/jne, ei sidottu karttaan huolimatta nimestä/kuvauksesta) | jatkuva idle | 30 s odotus; katso `mapPeck` (nokkiminen) nousevan kierrossa myös silloin kun pulu EI ole kartan päällä. **Huomio:** nimestä huolimatta ele ei tarkista onko kartta näkyvissä. |
| bunFeast | Pelitilanne | Pullan ostotapahtuma (`fokustehtavat.js:633`, `ilmoitaLivianTilanne('bunGranted')`) | tapahtumapohjainen-harvinainen | Osta pulla kaupasta/tehtävästä kerran; katso `bunFeast`. Tarkoituksella kertaluonteinen per ostotunnus (`syodytPullat` WeakSet estää toiston). |
| cityExplain | Puhe | Puhecue `tarkoitus:'selittaa'` kaupungin ääniraidalla (livia-pilotti-cuet.js) | tapahtumapohjainen-yleinen | Kuuntele pilottikaupungin ääniraidan selitysosuus loppuun; katso pulun kävelevän puhuessaan (`cityExplain`). |
| smile | Pelitilanne | Answer-sentimentin oletus kun `livianRepliikinEle`=`blink` (eleet.js:525 vaihtaa `smile`:ksi); tunnetagi `lammin`; kortin ruoka/kulttuuri-aihe; reaktio/puhecue `huvittuu`<0.4 | tapahtumapohjainen-yleinen | Vastaa mihin tahansa pelaajan kysymykseen ilman erityissävyä; katso pelaajan oman vastauskuplan eleeksi `smile`. |
| grin | Pelitilanne | Visa/tehtävä ONNISTUU (`success`→`grin`, visa.js:163) — hyvin yleinen; myös sentimentti "oikein/löysit/onnistu"; tunnetagi `ilo`; kortin urheilu/lintu-aihe | tapahtumapohjainen-yleinen | Vastaa visakysymykseen oikein; katso `grin`. |
| wink | Pelitilanne | Chat SULJETAAN (`chatClose`→`wink`, eleet.js:524) — joka kerta | tapahtumapohjainen-yleinen | Avaa chat ja sulje se; katso `wink` joka kerta. |
| welcome | Pelitilanne | Chat AVATAAN (`chatOpen`→`welcome`, eleet.js:524) — joka kerta | tapahtumapohjainen-yleinen | Avaa chat; katso `welcome` joka kerta. |
| present | Pelitilanne | Valokuva missä tahansa kaupungissa PAITSI Venetsiassa (eleet.js:523); kortin kaupunki-aihe | tapahtumapohjainen-yleinen | Ota valokuva ei-Venetsia-kaupungissa; katso `present`. |
| glasses | Pelitilanne | Isoisän lehti/päiväkirja-dialogi avataan ENSI kertaa (`lehtiMuuttui`, eleet.js:613-615); kortin historia/tekniikka/sana/hetki-aihe | tapahtumapohjainen-yleinen | Avaa lehti/päiväkirja-dialogi ensimmäistä kertaa; katso pulun pukevan lasit (`glasses`). |
| bookStudy | Pelitilanne | Chat-vastauksen jälkeinen lukupoosi (`chatVastaus`, useissa haaroissa); mietintälauseet "nokka kirjaan, siipi kartalle"/"luen sen pienellä painetun kohdan" | tapahtumapohjainen-yleinen | Kysy chatissa kysymys ja odota vastaus loppuun asti; katso pulun päätyvän kirjaa selaavaan asentoon. |
| scratch | Pelitilanne | Lehti/päiväkirja auki + 22 s ilman muuta toimintaa, vuorottelee `eyeRub`in kanssa (eleet.js:582-583); myös lehti-tilan oletusodotusele ja mietintälause "sähkekone rätisee taas" | satunnainen idle | Avaa lehti, odota 22+ s koskematta mihinkään; katso `scratch`/`eyeRub`-vuorottelu. |
| eyeRub | Pelitilanne | Sama 22 s -kierto lehti auki, vuoro 2/2 | satunnainen idle | Sama testi, odota kaksi kierrosta (~44 s) nähdäksesi molemmat. |
| chuckle | Pelitilanne | Reaktio/puhecue `huvittuu` voimakkuus≥0.55 (korkein kynnys smile<0.4/grin<0.55/chuckle≥0.55) | tapahtumapohjainen-harvinainen | Etsi narratiosta/puhecuesta `huvittuu`-tagi jonka voimakkuus on korkea (esim. livia-pilotti-cuet.js:n `huvittuu`-rivi) ja kelaa siihen; katso `chuckle` eikä `grin`. |

## Yhteenveto (70/70)

- **a) Vapaassa idlessä (jatkuva idle -kierto, 8 kpl):** blink, turn, preen,
  glance, tilt, lookUp, lookDown, mapPeck.
  (+ 2 kpl **satunnainen/kontekstisidonnainen idle**: scratch, eyeRub —
  vain kun lehti/päiväkirja on auki ja peli on ollut 22 s hiljaa.)
- **b) Tapahtumapohjaisia, yleisiä (33 kpl):** lookRight, nod, shake, manic,
  expert, disbelief, confused, love, listen, think, reading, crumb, bread,
  wind, rain, flyAway, flyBack, clumsyLand, walkBack, peek, trailerFlee,
  trailerBack, chatDashOut, chatDashBack, chatDustOff, cityExplain, smile,
  grin, wink, welcome, present, glasses, bookStudy.
- **c) Tarkoituksella/rakenteellisesti harvinaisia (16 kpl):** doubleTake,
  shock, embarrassed, angry, bored, puff, yawn, sleep, wake, sneeze, sun,
  snow, glassCrash (1/7-laskuri), handoff (kerran per sessio), bunFeast
  (kerran per ostotunnus), chuckle (korkea voimakkuuskynnys).
- **d) Vain suoralla toista()-kutsulla (1 kpl):** glideIn (`ensiliito()`-
  julkinen rajapinta, pollo.js:7356).
- **e) Orpoja — ei löydettyä laukaisijaa (9 kpl):** happy, facepalm,
  walkRight, owl, arrive, crash, emerge, leaveRight, leaveDown.
  (+ 1 erikoistapaus, EI lasketa orvoksi mutta ei myöskään koskaan oma
  pelieleen: **talk** — käytetään vain nokan aukion muotolähteenä puheen
  aikana, ei koskaan `toista('talk', …)`.)

8 + 2 + 33 + 16 + 1 + 9 + 1 = 70. ✓
