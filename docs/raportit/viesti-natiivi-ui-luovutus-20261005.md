# Natiivi-UI:n luovutus 5.10.2026 klo 06.1x (viikkoraja 97 %, tilinvaihto n. 07.15)

Rooli: Natiivi-UI (Opus, high). Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, haarat natiivi-ui/<aihe>,
worktreet /Users/Shared/Claude/wt/proto-natiivi-ui-<aihe>. Käännös: lokit/natiivi-ui-1035/skriptit/kaanna-kopioi.sh
<haara[+haara]> vasta Julkaisijan "NYT käännös" -viestistä; .app kopioituu lokit/natiivi-ui-1035/app-<SHA>.
Simu vain Julkaisijan "SIMU NYT" -viestistä, oma iPhone FB234D08-4693-4496-9C7A-6C7C15B03963, iPad
AD119F7B-A2A2-43EE-8769-7326DD757F89; lopuksi sammutus ja "simu vapaa".

## KEHITYSTAHTI (omistaja 5.10. 12.30, Raamattu kohta 2 #3992)
VIE-ikkunat klo 12 ja 20 (valmis + kuitattu lähtee, keskeneräinen odottaa). iPad-mittaus ei ole VIE-ehto. Toiminnallinen
rutiinierä kuitataan ENSIN Laitetestaajalla; Päätoimittajalle vain omistajalle näkyvä/maku/sisältö (esim. latauspalkki).
Todisteet todistusajolla (proto tyokalut/todistusajo/, TODISTUS.md merge-pyyntöön) VASTA kun Pelikoodari ilmoittaa
testimykistyksen käännöksessä ja OHJE.md valmiina.

## Juna 142 — Päätoimittaja kuittasi, merge-pyynnöt Natiivisepällä
- natiivi-ui/jatka-pulun-kuva 2f56284a — Jatka kuin Ohita; Puhe.Lue jatkohiljaisuuden portin taakse; Jatka-napautuksen
  irrotus ei päätä hiljaisuutta; Ohita näkyy aina automaattisen luennan aikana kartalla; maakuntakortin lisäkysymykset.
- natiivi-ui/vaaka-linssivalikko a4ce9696 — vaakavalikko turva-alueen alareunaan, KESKENERÄISET väkäsen takana,
  linna "Muurien sisällä", Ihmisen matka II keskeneräisiin.
- natiivi-ui/iss-taulu-vaaka eb9fd93b — ISS-taulun asettelusilmukka, taulun ✕ pois, AUTO sammuu vain AUTO-napista ja
  zoomi säilyy.
- natiivi-ui/lipputanko-kiintea 536783f0 — yksi kiinteä tangon paikka per maa, peitossa Lipputanko.Piilota.

## Juna 143 — avoinna
- natiivi-ui/chat-linna b38360f4 — KUITATTU, Natiiviseppä mergesi juna-143-koeen (3a6c994e).
- natiivi-ui/x-napit 9a688396 — ✕-inventaarion poistot, KAIKKI todennettu oikealla napautuksella (xt-arkki.jpg,
  xs3-6-sisallys-ohi.png, 06.53); KUITATTU junaan 143, merge-pyyntö lähetetty Natiivisepälle 06.5x.
  Natiiviseppä mergesi juna-143-koeen (a7cd8d44).
- natiivi-ui/x-siivous 121b0840 (07.5x, BUILD 142:n päällä) — siivous 16/20/21: IssKyytiNakyma sulkuVanha (näkyi vain
  avaruuskävelyllä, joka on pois valikosta), Linssivalitsin ylaSulje ja kuollut Muut-paneeli. unity-tarkistus 0 virhettä,
  pohjavahti ok, merge juna-143-koeen puhdas. Käännös 354fa015 (08.14), simussa todennettu 10.2x oikeilla napautuksilla
  (proto-3d/lokit/natiivi-ui-1035/xsiivous/xs-arkki.jpg); lähetetty Päätoimittajalle kuitattavaksi 10.3x → kuittauksen
  jälkeen merge-pyyntö Natiivisepälle. KUITATTU 10.4x, merge-pyyntö Natiivisepälle lähetetty 10.4x.
- POISTU-löydös selvitetty 10.5x kevyellä koneella: vain 0 s:n simutap (painallus ja irrotus samassa kehyksessä) pienentää
  pöydän (IssKytkinpoyta.Napautus PointerDown); 0,1 s toimii. Suositus Päätoimittajalle: ei korjausta junaan 144
  (xsiivous/xp-poistu-arkki.jpg). Todisteissa käytä kytkinpöydän painikkeille duration ≥ 0,1 s.
  Päätoimittaja 10.5x: hyväksytty, ei korjausta. TUNNETTU RISKI: alhaisella fps:llä nopea tap voi osua samaan kehykseen.
  Jos näkyy laitteella (Laitetestaaja kokeilee fyysisellä iPadilla), korjaus osumatestillä (onko painallus pöydän rajojen
  sisällä), EI kehysjärjestyksellä.
- natiivi-ui/iss-ohjaamo-lcd 0fdda21f — ohjaamo + LS2:n LCD-paikat; odottaa LS2:n maailmakuvia (Amazonia) ja S2-indeksiä.
- Myöhemmin (Päätoimittaja): ISS-kuvan vihreä nimilappu hukkuu kirkkaalle hiekalle (az-3667-a4).

## Juna 144 / Tavlin TF-ehto — avoinna (11.1x)
- natiivi-ui/kirjainvali-kerning 46b62059 (master) — ENSIN (Tavlin TF-ehto, Päätoimittaja 11.0x): harvennettu teksti ilman
  parikerrontaa (Kirjasimet.HaeHarva, Aseta valitsee letter-spacingin mukaan). Syy: TextCore nollaa letter-spacingin
  kerning-pareilta (IgnoreSpacingAdjustments, UnityCsReference TextGeneratorParsing.cs) → "TAVL I", "O TTO M A A N I E N".
  Todisteet: Tavli 3 lautaa, Mylly, Pelit-lista. Testikäännös yhdessä siirtoseppa/tavli ea02bae1:n kanssa.
- natiivi-ui/ei-linssia dba06119 (x-siivouksen päällä) — omistaja 11.0x: "Ei linssiä" -rivi vain kun linssi päällä.
  Todisteet: normaali kartta (rivi poissa) + topografialinssi (rivi näkyy ja palauttaa kartan).
- Testikäännös a8a860c7 (11.22), simussa todennettu 11.2x: proto-3d/lokit/natiivi-ui-1035/kirjainvali/
  (otsikko-ennen-jalkeen.jpg, kirjainvali-arkki.jpg, ei-linssia-arkki.jpg). Lähetetty Päätoimittajalle 11.3x kuitattavaksi;
  kysymys: Linssit-näkymän esikatseluikkuna "Ei linssiä" normaalilla kartalla (suositus: jätetään). Kuittauksen jälkeen
  merge-pyynnöt Natiivisepälle (kirjainvali-kerning Tavlin TF-ehtona, ei-linssia juna 144).
  KUITATTU molemmat 11.3x → merge-pyyntö Natiivisepälle junan 143 lisäerään (kirjainvali-kerning tavlin kanssa, ei-linssia
  samassa). Omistaja 11.35: esikatseluikkuna piiloon normaalilla kartalla → ei-linssia 7837ac54 (käännös db99e1f5,
  todennettu 11.4x, eilinssia/ei-linssia-v2-arkki.jpg); lähetetty Päätoimittajalle kuitattavaksi, Natiiviseppä pidättää
  ei-linssian siihen asti (muuten juna 144). KUITATTU 11.4x → merge-pyyntö 7837ac54 Natiivisepälle (143 lisäerä).
- SEURAAVA: lepo. ISS-ohjaamon paneeli (iss-ohjaamo-lcd 0fdda21f) junaan 144 LS2:n kuvien kanssa — Päätoimittaja
  pyytää, kun kuvaparit on hyväksytty. Worktreet: wt/proto-natiivi-ui-{xsiivous,eilinssia,kerning} poistetaan, kun
  haarat ovat masterissa (git worktree remove, omat).

## Latauspalkki (omistaja 5.10. 12.5x) — avoinna
- natiivi-ui/latauspalkki 36853057 (juna-143-koe 91220fb6:n päällä): Latauspalkki.cs (+.meta) EDISTYMINEN-pohjan kääre,
  pohjan kulma 0 (Päätoimittaja A 13.0x, koskee myös sisällön latauksen palkkia), .mk-edistyminen--latauspalkki 140×3,
  tk-teema-tumma. DioraamaTaulu: tekstit pois, palkki nimiruudun alle (esiin 1 s), DioraamaTaulu.LatausEdistyminen
  (Func<float>, Siirtoseppä kytkee). Testi `ui linnapalkki 0.35|pois`. Seuraava: käännös + stillit iPhone FB234D08 ja
  iPad AD119F7B (kesken ~0,35 ja lähes valmis ~0,92) → Päätoimittaja → omistaja ennen junaa.
  13.4x: haara nyt 688d6b4e (tyylikirja.json peruttu: luodaan webistä, tiivistetarkistus; luettelorivi Päätoimittajalle).
  Koehaara natiivi-ui/latauspalkki-koe 2ea2528f (+ kytkentärivi, EI mergetä) käännetty siirtoseppa/linna-143:n kanssa
  → b274b20c (MATKAKIRJA_KIRJASTOT=…/_lahteet/unity-paketit-siirtoseppa/kirjastot pakollinen Cinemachinen takia).
  Stillit latauspalkki/latauspalkki-arkki.jpg lähetetty Päätoimittajalle 13.4x (odottaa omistajaa). Löydös Siirtosepälle:
  LatausOsuus 99 % jo 13 s, avaus 27,6 s. Kytkentärivin lisää Siirtoseppä omaan haaraansa.
  Päätoimittaja 13.5x: ulkoasu hyvä, stillit omistajalla; 99 %-pysähdys Siirtosepälle. Tyylikirja: web-PR #3998
  (Julkaisija mergeää vihreänä), natiivin kopio latauspalkki 62bafb4a (lähde f3ec57932a52). Merge-pyyntö Natiivisepälle
  vasta, kun omistaja hyväksyy JA Siirtosepän ajoituskorjaus on mukana.
  14.04: ajoitus todennettu 1e32f0b1:llä (linna-143 3be07c30): 1. avaus 1→92 % 15 s, 100 % 15,4 s; 2. avaus 49→87 %,
  100 % 6,6 s (lq-alku-stdout.txt, q1/q2-kuvat). ODOTTAA vain omistajan hyväksyntää → merge-pyyntö latauspalkki 62bafb4a;
  kytkentärivi Siirtosepän haarassa.
  OMISTAJA HYVÄKSYI 14.0x → merge-pyyntö Natiivisepälle junaan 144 (latauspalkki 62bafb4a ensin, sitten linna-143
  kytkentärivillä). Web #3998 mergetty. Worktreet wt/natiivi-ui-tyylikirja-latauspalkki (web) ja proto latauspalkki
  poistetaan, kun juna 144 on masterissa.

## Versio Peli päivittyi -ruutuun (omistaja 5.10. 14.2x) — avoinna
- natiivi-ui/paivitys-versio ba181e97 (master a5a18288): MitaUutta.Dialogi lisää KORTIN kapiteelin "Versio 1.1 (144)"
  (Application.version + MitaUutta.Build() = rakennus.txt ← PlayerSettings.iOS.buildNumber, Rakennus.cs) molempiin
  dialogeihin; teksti näyttöhetkellä (PaivitaVersio). Simussa build = 0. Testi `ui mitauutta paivittyi`.
  Seuraava: käännös + stillit iPhone/iPad → Päätoimittaja → merge-pyyntö Natiivisepälle junaan 144.
  14.33 stillit versio/i-paivittyi.png, p-paivittyi.png; 878c7acd korjaa Mitä uutta -kortin napit (i-mitauutta-korjattu.png).
  Lähetetty Päätoimittajalle 15.07 (odottaa).

## PUHUJAKUVA (omistaja 5.10. 14.3x, kortti "Ensin kappelin koe") — avoinna
- natiivi-ui/puhujakuva 48535d12 (master a5a18288): UI/Linssit/Puhujakuva.cs (+.meta) kehyksetön kuva, ellipsimaski alfaan
  (GPU-kopio, 256 px), ankkuri maailmasta ruudulle joka ruudulla, häivytys 200 ms, ristiinhäivytys, leveys 22 % lyhyemmästä
  sivusta (72–140 pt). Linssit.uss .mk-puhujakuva. Paikkamerkit Resources/Puhujakuvat/*.png (11 kpl, Linnanrakentajan CC0
  rintakuvat _valmiit/linna-hahmot/rintakuvat-paikkamerkki, rajattu). Testi `ui puhujakuva <kuva> [x y]|pois`.
  Kytkentä Siirtosepälle (Ankkuri, Kamera, Viimeisin.Aseta(henkilö, ilme)); odottaa hänen SHA:taan → yhteiskäännös →
  still + video Päätoimittajalle. Myöhemmin: web tyylikirja.json PUHUJAKUVA-pohjan rivi (PR kuten #3998).
  15.0x KUVATTU fa912f5e:llä: puhujakuva/puhujakuva-arkki.jpg + puhujakuva-kappeli.mp4 → Päätoimittajalle (odottaa).

## Kohdekortti heiluu (omistajan bugi 5.10. 14.4x) — avoinna
- natiivi-ui/kutsu-paikallaan 4ae969b7 (master): syy Kutsuminiatyyri asettui UiKerros.JokaRuutu-vaiheessa (Update,
  järjestys määrittämätön PalloKierto.Updaten kanssa) → kortti jäi ruudun kamerasta. Korjaus: UiKerros.KameranJalkeen
  (UiKameranJalkeen, DefaultExecutionOrder 20: kameran jälkeen, ennen PreLateUpdaten UITK-päivitystä) + pikselikohdistus
  fyysisiin pikseleihin. Huom: kamera liikkuu myös korutiineissa (lennot) → niissä voi yhä jäädä ruutu. Todiste: oikea veto
  simuun, video ennen (app-736578a7 = master+versio) / jälkeen, ero kortti–kaupunki ≤ 0,5 pt ruuduittain.
- 15.0x: yhteiskäännös fa912f5e (kutsu + puhujakuva-koe a8f6465e + paivitys-versio 878c7acd). Kohdekortti EI näy Ateenassa
  masterissakaan (ui kutsu: piilossa) → todiste puuttuu. Haara nyt d7f859cf: UiKameranJalkeen omaan tiedostoon + ui kutsu
  kertoo piilon syyn (Syy()). Seuraava vuoro: syy → veto ennen/jälkeen, kutsu-ero.py (skriptit) mittaa kortti–nappula-eron.

## Tila 15.5x
- kutsu-paikallaan d7f859cf: todiste kutsu/kutsu-ennen-jalkeen.jpg + videot; vaakaero jälkeen ≤ 0,81 pt (180/197 ≤ 0,5),
  ennen ≤ 16,7 pt (skriptit/kutsu-ero.py). Lähetetty Päätoimittajalle kuitattavaksi.
- paivitys-versio 129a2513: merkinnät "1.1 (143)" ym. (versio/i-mitauutta-build.png) → kuitattavaksi.
- kortti-tiivis a7757d06 (linna-143 e7ad0d38 päällä, mukana siirtoseppa/puhujakuva-koe 1ae53205:ssä): Siirtoseppä todensi
  105c9ed8:lla; havainto: puhujakuva osuu tiivistetyn otsikkorivin päälle → korjattava (puhujakuva ei otsikkorivin alueelle).
- Puhujakuva ei junaan 144 (Codexin kuvat + omistajan kappelikoe).
- 15.5x KUITATTU junaan 144: kutsu-paikallaan d7f859cf ja paivitys-versio 129a2513 → merge-pyynnöt Natiivisepälle lähetetty.
- TUNNETTU (ei korjata nyt, Päätoimittaja): Ateenan kutsukortti voi jäädä piiloon, kun sen lukittu paikka on peitossa
  (Kutsuminiatyyri: paikka lukitaan kerran kaupunkia kohden; `ui kutsu` → "syy: peitossa (lukittu)"). Vanhaa toimintaa.

## Astronautin kuvanäkymä (omistaja 5.10. 16.1x, JUNA 145) — avoinna
- natiivi-ui/astrokuva-tauko 047844b1 (master): Kuvanakyma II-tauko (OHJAUSNAPPI lasi-avaruus, AUTOn viereen; Puhe.Tauko/
  Jatka luennan aikana, AUTOn laskuri seisoo, kuvan vaihto/sulku päättää), AstronauttiLinssi.TaustaJaatyy (kamera liukuu vain
  avauksessa; LS1+LS2 kuittasivat; testi päivitetty, Linssit-testit 625/625), .mk-astrokuva tausta 0,9, Sijaintipallo.Sykahda
  (1,4×: 0,4 s ylös, 1,5 s pito, 0,6 s alas). Pelikoodarille tiedoksi Tauko/Jatka. Seuraava: käännös + still/video iPhone+iPad
  (mykistys! AUTO-luenta = Puhe.Lue-striimi) → Päätoimittaja.

## Pulun chat yhdeksi pohjaksi (omistaja 5.10. 16.4x–16.5x, JUNA 145) — avoinna
- Inventaario docs/raportit/pulu-chat-inventaario-20261005.md (kaikki 8 paikkaa PuluChatissa; valmiit vastaukset ISS-taulu,
  Ihmisen matka, maakuntakortti, Ihmisen nostokortti).
- natiivi-ui/pulu-chat-yksi e035e5dc (juna-144-koe ec0038f4): VastaaValmiilla/VastaaLinssinValmiilla → Kysy + `taustatieto`
  (Pelikoodarin worker-rajapinta, `jatkot` takuulla 2), sirut avatessa Take(2), kaiutin kaksitilainen (Ikonit kaiutin-pois,
  `matkakirja-pollo-aani`), lukijan rivi piiloon chatissa. Odottaa: Pelikoodarin workerin julkaisu → käännös → kuvat kolmesta
  paikasta rinnakkain (kartta, astrokuva/ISS-taulu, maakuntakortti) Päätoimittajalle. Astrokohteiden 472 vastausta
  taustatiedoksi myöhemmin (AstronauttiAineisto, Linssiseppä).
  Päätoimittaja 16.5x HYVÄKSYI suunnitelman 1–4. Todisteet: kuvat rinnakkain ISS-taulu / maakuntakortti / kartan Pulu (avaus +
  yhden vastauksen jälkeen) + lyhyt ÄÄNELLINEN video kaiuttimesta (Auto lukee, viiva ei lue, tila säilyy paikasta toiseen;
  ääni Unityn kaappauksesta, skriptit/jatka-aani.sh-malli, ei kaiuttimia).
- Astrokuva: natiivi-ui/astrokuva-tauko-144 0062cd81 (junan 144 päällä; II lukijan kaiuttimen kanssa, Päätoimittaja hyväksyi)
  odottaa NYT käännös (~16.35) + simu iPhone/iPad → still + video. Vanha natiivi-ui/astrokuva-tauko 047844b1 vanhentunut.
  16.4x kuvattu 5294a748:lla (astrokuva/astrokuva-arkki.jpg + i-astrokuva.mp4), lähetetty Päätoimittajalle. Löydös → bc66e66d:
  AUTOn napit eivät piiloudu II-tauolla. Todennetaan seuraavassa käännöksessä ennen merge-pyyntöä (juna 145).

## Tila 17.1x
- astrokuva-tauko-144 bc66e66d: tauon napit todennettu (b88675a3) → MERGE-PYYNTÖ Natiivisepälle junaan 145 lähetetty.
- pulu-chat-yksi: todennettu b88675a3:lla ISS-taulu ja maakuntakortti (2 kysymystä, elävä vastaus, 2 korvaavaa jatkoa, kaiutin
  viivalla, tila säilyy). Löydös kartan Pulussa (uudelleen avaus → 4 sirua) korjattu 89e861e5; todennus seuraavassa käännöksessä,
  sitten merge-pyyntö (juna 145). Arkki puluchat/puluchat-arkki.jpg. Pelikoodari kuvaa elävän vastauksen videon (app-b88675a3).

## Tila 17.3x
- pulu-chat-yksi d1d1f0ee: + keskustelu paikoittain (c55f4c12) + sirut kiinni (d1d1f0ee); todennettu a8ab3018:lla
  (puluchat2/puluchat2-arkki.jpg) → MERGE-PYYNTÖ Natiivisepälle junaan 145 lähetetty. Avoin: astrokohteiden 472 vastausta
  taustatiedoksi (AstronauttiAineisto, Pelikoodari + Linssiseppä).
- Junaan 145 lähetetty myös astrokuva-tauko-144 bc66e66d.
- Lukematon: puhujakuvan ja tiivistetyn huonekortin otsikon päällekkäisyys (Siirtoseppä 15.4x) korjataan puhujakuvan kanssa.

## Elävä opas (Linssiseppä, Päätoimittaja 17.5x) — avoinna
- natiivi-ui/pulu-sieppaus bb27e664 (pulu-chat-yksi d1d1f0ee päällä): PuluChat.Sieppaa (Func<string,bool>) ja Vastaa(teksti,
  jatkot). Linssiseppä kytkee OpasSovittimesta (linssiseppa/lontoo). Ei uusia UI-elementtejä. Todennus yhteiskäännöksessä hänen
  haaransa kanssa; merge-pyyntö sen jälkeen.
- 18.0x KIIRE (omistaja, juna 144): natiivi-ui/pulu-sieppaus a65000ff: + PuluChat.AvaaOppaalle/SuljeOppaalta, OpasValikko
  (LinnaValikon pohja: Vaihda kohde › maanosa › maa › 12 suurinta kaupunkia; Poistu linssistä; KohdeValittu-koukku), paikat.json
  LS2:lta (87863aae, maanosa 6. sarake). Linssiseppä kytkee heijastuksella (linssiseppa/lontoo) ja kokoaa yhteiskäännöksen.
  Masterin päälle (Linssisepän pyyntö, Cinemachine-esitarkistus): natiivi-ui/opas-master 1ee62e19 (sama sisältö ilman
  pulu-chat-yksiä; puhdas lontoon ja juna-144-kokeen kanssa).

## ISS-ohjaamo junaan 144 (Päätoimittaja kuittasi, Natiiviseppä 18.3x)
- natiivi-ui/iss-ohjaamo-144 2bb26db8 = ec0038f4 + LS2 a2941f8f + iss-ohjaamo-lcd (sis. paneeli 125809dc); konfliktit ratkaistu,
  tyylikirja uudelleen web-lähteestä (lcd-tokenit) → web-PR #4010 (Julkaisija mergeää). tarkista.sh ok, Linssit 658/658,
  Kartta 444/444. SHA Natiivisepälle lähetetty.

## Testiskriptit (lokit/natiivi-ui-1035/skriptit)
jatka-aani.sh (ääniraita = Unityn tallenne.wav; JATKA_TAP=1 oikea napautus), aanitaso.py (puhe > −32 dB),
iss-taulu-vaaka.sh (TAP_OHI=1), auto-zoom.sh (TAP_SEUR=1), lippu-kaikki.sh, chat-linna.sh, kartoitus.sh (+ k:-etuliite
kartan komennoille), xn-tap-alku.sh + xn-k.sh (oikeat napautukset simulaattorityökalulla). `ui napauta` ohittaa
osumatestin → todisteisiin aina simun oikea napautus.
