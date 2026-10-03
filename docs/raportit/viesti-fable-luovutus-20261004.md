# Päätoimittajan luovutus 4.10.2026 klo 00.3x (oma kontekstinollaus, konteksti 64 %)

Sessio "Päätoimittaja (Opus, max)" **local_5df52e10-10e4-4b72-9554-0049db300dfe** (id säilyy nollauksessa), haara claude/bold-ride-vow4ki, RC päällä.
Tili: viikko 37 % (raja 99 %, reset pe 9.10. klo 08.00). TF-laskuri 4.10.: TF 133 ladattu 3.10. klo 21.1x, TF 134 VIE annettu 00.2x.
Omistajalle vain suomeksi; kellonaika `date`:lla; omistajalle vain pelistä otetut ja **itse tarkistetut** kuvat/tallenteet.

## SITOVAT UUDET LINJAT 3.10. (lue ennen mitään)
- **TARKISTA–KORJAA–TARKISTA** kaikissa osa-alueissa (Raamattu #3901): omistajalle vain se, mihin olet itse tyytyväinen.
- **Natiivi hyväksytään vain äänellisestä tallenteesta** (`ffprobe` audio-stream), A/V-iskut mitattuna; käy jokainen elementti JA omistajan aiemmat palautteet aiheesta (grep lokista) läpi; paikkamerkit kerrotaan omistajalle ennen TF:ää (muisti tarkistus-laitteella-aanen-kanssa). Syy: omistaja löysi TF 133:sta virheitä, jotka hyväksyin.
- **EI WEBIÄ LAINKAAN** (omistaja kortti 19.00, #3904): uudet linssit, linnat, ajattelijat vain natiiviin; web-PR:t vain työkaluja. docs/web-jono.md (#3908).
- **ODOTTAA OMISTAJAA → PUSH** (#3903): Postivahti pushaa 5 min välein. Kaikki 12 roolia bypassPermissions. Puhelimen lupakortissa ei ole "salli aina".
- **Ei poistoja oman checkoutin ulkopuolelta** (loki 19.42; Raamattu #3915 junassa). Syy: LS2:n rm -rf laukaisi lupakyselyn.

## ODOTTAA OMISTAJAA
1. **Toimi (pyydetty ~00.0x):** kun hän lopettaa koneella → konsolikäyttäjäksi koodaus + iPad Pro 13 (00008103) USB:hen auki → LS2:n A/V-mittaus laitteella.
2. Kysymys (vastaamatta): kuunteliko ajattelijat kuulokkeilla (AirPods) vai kaiuttimesta? (Bluetooth-latenssi.)
3. Seuraava ajattelija (Platon suositus) — omistaja katsoo ensin korjatun version. Arkki vs Allymes ja erikoismallit erä 7 jäivät kortissa 20.06 vastaamatta → kysy, kun ajattelijat ovat kunnossa.

## JUNAT
- **TF 134 (VIE annettu 00.2x):** master 137108e2 = BUILD 133 + kerma-erä + minipallo-selain (pyöritettävä) + Natiivi-UI pyöreät napit neliöiksi + muunnin-vaihto. Julkaisija ilmoittaa → kerro omistajalle lyhyesti (hän odottaa minipalloa).
- **Juna 135 (Natiiviseppä kokoaa):** Cupola-veto 4aa02624 (hyväksytty, siirretty 134:stä) + glint (Linssiseppä 1, linssiseppa/glint c2d70795, KESKEN: aaltojuovat liian vahvat; aamun simuvuoro; vaatimus: hopeanvalkoinen, rakeinen, venyvä, vain vedessä) + ajattelijakorjaukset (alla). TF 135 vasta kun kaikki tarkistettu.

## AJATTELIJAT: OMISTAJAN TF 133 -PALAUTE (loki 23.53) — KORJAUKSET
- **A/V-tahti** (LS2, linssiseppa2/ajattelija-tahti 76c8daac): dspTime-kello, PlayScheduled samaan hetkeen, latenssi (outputLatency + IOBuffer). Ensin numeerinen mittaus sovelluksen lokista (ms per isku), sitten fyysinen iPad.
- **Savu** (LS2): maski sumennettu, tummennus puolet v5:stä; A/B kuviin.
- **Taustarivit**: Pelikoodarin atlas #3913 hyväksytty (luettava, 0,04 em, 59 %). LS2: näkyvä kirjainkoko ≤ 60 % päälainauksesta + hipaisukulman (N·L) häivytys.
- **Kaiut** (Sisältökirjuri → Linnanrakentaja → LS2 Sokrates / LS1 Marcus): hyväksytty David (kuolema), sadeihme (pää + parta), uhri v6 (Capitolinen CC BY-SA, José Luiz, attribuutio). **Kesken:** oraakkeli = puhdas kolmijalka toisesta PD-lähteestä (nykyinen yhä kyliksen rajaus → hylätty); Linnanrakentaja: Davidin alareuna pidempi häivytys (25–30 %), kuolinvuode mustapiste (luma→alfa) + pienempi voimakkuus (nyt kirkas suorakaide), uhri sivujen häivytys. Ei mitään väliaikaisena.
- **Intron iskut (LS2:n mittaus 00.3x):** natiivi A/V on alle ruudun (+1…+14 ms), mutta v14-musiikin kuuluvat iskut ovat osin +50…+110 ms leikkauksista (ruudut 61 ja 184) → Linssiseppä 1 mittaa WAV:sta iskujen alut → Linnanrakentaja siirtää leikkaukset; LS2 poistaa mp3:n LAME-alkuviiveen (1105 näytettä). Tämä on todennäköisin syy omistajan havaintoon.
- Ketju lopuksi: luvut → natiivi (LS2/LS1) → **äänellinen** tallenne → oma tarkistus listana (taustarivit, iskut, tummuus, savu, kaiut, välähdykset, latausruutu, prologi) → omistaja.

## ROOLIT (id:t ennallaan, ks. viesti-fable-luovutus-20261003.md)
Julkaisija: TF 134 vienti, #3915 junaan. Natiiviseppä: juna 135. Natiivi-UI: levossa (napit 134:ssä). Pelikoodari: jono tyhjä (ajattelijaputki #3912 mainissa; `node tools/ajattelija-putki.mjs <tunnus>`). Linssiseppä 1: glint + Marcus-data. Linssiseppä 2: tahti/savu/rivit. Linnanrakentaja: kaiut. Sisältökirjuri: oraakkeli. Siirtoseppä: levossa (mylly 133:ssa). Karttaseppä: S2 Aasia+Australia su ~06.30, sitten tarkistus; joet-koodi #3910 junassa. Laitetestaaja, Postivahti: kierto.
Levy 43 Gi (20.59 siivottu 13 .app-kopiota; yösiivous: yli 24 h .app, uusin per sarja jää).
