# Julkaisija: luovutus 4.11.2026 klo 17.20 (Macin kello) – konteksti 30 %

Rooli: Julkaisija (JU). Korvaa -20261104-1404:n ALOITA-, KÄYNNISSÄ-, JONO- ja LISÄYS-osat; sen ja -1226:n, -1045:n OPIT voimassa. Jonoloki: /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt (T = tuo kansio), viimeiset rivit ajan tasalla. Katso kuvat ennen kuittausta ja sano, jos katsoit vain osan.

## ALOITA TÄSTÄ
1. Viritä Monitor: zsh T/ju-vahti.zsh | grep --line-buffered -vE '^(lav-tausta|lav-jalustat|PROSESSI LOPPUI lav-)' (30 min; ensimmäiset rivit vanhoja). Päivitä T/vs-muisti-ketju.pid jokaisen iPad-ajon alussa.
2. Tarkista tila: tail T/jono-20261103-ilta.txt, T/vs-muisti-ketju.log, /tmp/matkakirja-ipad.lukko/kuka, T/kaanna-974f95213.log, T/kaanna-d9cde0f50.log.

## KÄYNNISSÄ 17.20
- iPad: VS sk-lataus-h 484adb22f (pid 94840, kansio lokit/julkaisija-lataus-h-484adb22f). VS tarvitsee myös konsoli.txt:n. Rivi VS.
- Laitekäännös 974f95213 (L2, T/kaanna-974f95213.log) ja sen perässä d9cde0f50 (T/kaanna-d9cde0f50.log). Nollaus voi katkaista odottajat: jos käännöstä ei tule, aja zsh T/kaanna-vapaa.zsh <sha> uudelleen. Ei rinnakkain: sama unity67-projekti.
- L1 vapaa, simut vapaat.

## iPAD-JONO (yksi kerrallaan, edellisen pid ensimmäiseksi argumentiksi; käynnistysvika = sama komento uudestaan)
1. PK 974f95213, kun käännetty: zsh T/pk-muisti-974.zsh <edellisen pid>. Ottaa lukon, ajaa PK:n lahtotaso.zsh + ovet-esineet.zsh (lokit/pelikoodari-muisti-*), palauttaa rungon. Tulos PK + PT: huippu, varoitukset. Vertailu c4a5bfafb ka 4000, huippu 4068, raja 4080. Jos käännös ei ole valmis, kohta 2 ensin.
2. VS sk-rajat-tasot 484adb22f: ESISARJA=0 SK_TIED=<striimi/>sk-rajat-tasot.txt KANSIO_NIMI=julkaisija-rajat-tasot-484adb22f zsh T/vs-muisti-z10k60.zsh <pid> 484adb22f (<striimi/> = /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pariisi-tyyli/striimi). Rivi VS: huippu, varoitukset, kansio, "maasto siirtyma" -rivien taso-arvot.
3. Koerunko d9cde0f50: sk-muisti-z10-ei-varjoa (kansio julkaisija-muisti-z10k60-d9cde0f50), sitten sk-striimi-k45 (julkaisija-striimi-k45-d9cde0f50). Rivi PT: huippu, kulma, varoitukset, tiivisteet. Kuva todistaa kulman k45:ssä, ei lokin 0,0° komennon perässä.
- NUI:n kääntö: PT:n listalla, ei pyydetty. VS:n porrastus: b0288fc2e PERUTTU, uusi sha ja skripti tulevat VS:ltä. VS ja KS: suunnitelman 20261104-nd-valo-ja-puut kohta E, kun pyytävät.

## MAC
- VS ui-kerros uusinta iPad-jonon jälkeen: zsh T/esikatselu-rungolla.zsh <linja> 8fa059097 <striimi/>sk-ui-kerros.txt. Pitää näkyä loki.txt:ssä rivit "kerros ...". Rivi VS.
- Linjan pyytäjälle ESIKATSELU NYT + PROTO_LINJA; esikatselu.sh jonottaa lukkoa, joten sana voi mennä heti. Laitekäännös ei jonota.
- TRIPO palvelijatar v2 viimeisenä kuten edellä (20–30 min, ALKAA-rivi postilaatikkoon, ei Unity-ajoja jakson aikana, kuvat edestä ja takaa KK:lle ennen kytkentää).

## KOERUNKO
d9cde0f50, wt/julkaisija-koe-218, haara julkaisija/runko-219-muisti, natiivi-backup. c4a5bfafb + 7f64cd657, e774647ee, 484adb22f (ff216e7d4) + c194bbf29, 35b6ee8b4. Ristiriita: ElavaTyyliVersio → e18, koska rungossa ei ole striimikarttaa ja iPadilla on e17-välimuisti. Maakuntarajat on ajettu vain striimi-pohjalla. Todistamaton, kunnes k60 + k45 on ajettu; uusi sha PT:lle jo kerrottu. Ei julkaisua eikä lukitusta. dotnet puuttuu Macista, testejä ei ajettu.

## TULOKSET TÄNÄÄN (lokit/julkaisija-*-484adb22f ja rungot)
k19 3678, k60 3403, k45 3781, k0 3639, loput 3356 (h-z13:n vedessä suorakulmaiset väriporrastukset), f0e kallistus 3418, maakuntarajat 3827, ND 602 3237 Mt; kaikki 0 varoitusta. 484adb22f hyväksytty muistin osalta (PT), maakuntarajat 35b hyväksytty (KK 17.1x). f0e:n Helsinki-pari tavulleen sama: kallistettuna tasainen "irti", NS:llä.

## MUISTISSA, EI AJOA NYT
Ennallaan -1404:stä: Karsi yhdistelmään kun tehdään (sk-karsi-koe-2, KS); NUI:n `ui tarina viimeinen-keisari` seuraavaan yhdistelmäajoon; vanhan juoksupelin iPad-ajot vain perustellulla sanalla (PK:n 974 on PT:n sana); levyä kartta-osat ei tyhjennetä ilman PT:n sanaa. Error 22 auki.

## OPIT
- esikatselu.sh rivi 82 kopioi Esikatselu.cs:n työkalun puusta, ei rungosta. Oma virhe: k17 (d64f74a56) ajoi 5 kansiota vanhalla: 152659, 153426, 154438, 154718, 160819. PT tarkisti: 232 lisäystä, 0 poistoa, kuvat pätevät; ui-kerroksen lokirivit puuttuivat. Esto T/esikatselu-rungolla.zsh <linja> <sha> <skenaario>; ajettu onnistuneesti 2 kertaa. LAV:n omat skriptit käyttävät yhä k17:ää.
- Kun runko vaihtuu, pysäytä vanhan rungon käännös heti: 006b9c194 varasi L2:n 16.23–17.06 PK:n ja ND-valon edeltä. Vain oma pid (xcodebuild), trap vapauttaa lukon.
- Laitekäännökset jakavat unity67-projektin: T/kaanna-vapaa.zsh odottaa nyt laite-sha:ta. Vapaa linja ei riitä.
- vs-muisti-z10k60:n ensimmäinen argumentti on odotettava pid, joten ketjun voi virittää valmiiksi. Jos edellinen kaatuu käynnistykseen, seuraaja ohittaa sen: aja kaatunut uudelleen.
- `kuvaa n/n` ei kerro sisällöstä: vertaa tiivisteet parin kesken. Saman tiivisteen pari tarkoittaa, ettei vertailu näytä mitään.
- Laitekansiot: 22 siirretty T7:lle (T/laite-t7.zsh, proto-lokit-arkisto); 693cf437f ja jonon rungot säilytettävä.

## LISÄYS 17.3x (korvaa KÄYNNISSÄ-osan ja jonon järjestyksen; tarkista T/jono-20261103-ilta.txt)
- iPadilla sk-rajat-tasot 484adb22f (pid 35381). L1 + simut: NUI 63383ba6e, rivi kun vapaa.
- 974f95213-koonti oli SEKOITUS (oma d9c-yritys 17.17 vaihtoi unity67:n checkoutin kesken): siirretty lokit/julkaisija-laite-218-974f95213-SEKOITUS, ei ajettu. Käännösjärjestys: T/kaanna-vapaa.zsh d9cde0f50 → T/kaanna-974-perassa.zsh. Jos nollaus katkaisee, käynnistä järjestyksessä. Tarkista aina T/kaanna-<sha>.log:n KÄÄNNETTY-rivin sha ennen ajoa.
- iPad-järjestys: rajat-tasot → valmiista ensin k60 + k45 d9cde0f50 tai PK 974f95213. k45:n skenaario on T/sk-striimi-k45-rajat.txt (PT: lisänä r-fra-z10, r-fin-z10, 19 kuvaa; katso rajat itse ja anna kuvat NS:lle vertailuun). PK:n tulos PK + PT.
- Terassi-v1 (LAV, SHA 6bc8ca34dd4f): erillinen haara d9cde0f50:n päälle vasta k60/k45:n jälkeen, ei junaan, ei ämpäriin; ensin paikallinen file://-juuri, vienti uutena kansioversiona vasta PK:n vahvistuksella (PT).
- PK nollautuu ja tekee KK:n 17.24 ovikorjaukset; pyytää uuden vuoron. VS ND-valo v1–v4 valmiit, sama POIKKEUS ArgumentOutOfRangeException ui sulje -rivin jälkeen joka ajossa (VS tietää v3:een asti).

## LISÄYS 17.5x (uusin; korvaa edellisten järjestykset; tarkista T/jono-20261103-ilta.txt)
- Valmiit: rajat-tasot 3508 Mt → VS; k60 d9cde0f50 3337 Mt, 54°, ei varjovalintaa → PT.
- Ajossa: iPad k45 + rajat d9cde0f50 (pid 72805, kansio julkaisija-striimi-k45-d9cde0f50). Lokissa "VIKA laheta ui-komento" 17.47: tarkista konsolista ui-rivit. Rivi PT: huippu, kulma (kuva todistaa), varoitukset, tiivisteet; katso r-fra-z10 ja r-fin-z10 itse, kuvat NS:lle (35b-kansio julkaisija-maakuntarajat-35b6ee8b4 vertailuun).
- Mac: NUI 63383ba6e L1 + simut; LAV kk2 (T/lav-kk2.log, rivi "KK2 AJETTU" → LAV); PK ee9ed51b0 L2; 974-käännös odottaa vapaata linjaa (T/kaanna-974-perassa.zsh, T/kaanna-974f95213.log).
- k45:n jälkeen iPad: PK 974f95213 (T/pk-muisti-974.zsh <pid>, tarkista kaannos.txt = 974f9521) → KS 92c47e215 sk-nd-ipad, kansio julkaisija-nd-ipad-92c47e215 (korvaa db3d2713e:n; käännös 974:n jälkeen, T/kaanna-vapaa.zsh; rivi KS).
- k45:n jälkeen: terassi-v1-haara d9cde0f50:n päälle (LAV, ohje edellä), rivi LAV. ui-kerros 8fa059097 iPad-jonon jälkeen.
