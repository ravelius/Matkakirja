# Turku A #2458 — valmistelu ja työraja

Valtuutus: PT/KK, commit `5a066cbf50fb171bf10d2fcdd833aeb31f553dd4`, blob `096f510ecef77c618e95d41a2a47130b8987d008`. Tämä on valmistelu, ei valmis malli eikä aloitettu raskas ajo.

## Aika ja resurssit

- Vain CODEX-IKKUNA5 16.11.2026 klo 22.00–24.00 EET, UTC 20.00–22.00. Ikkuna4:n aikaa ei käytetä Turkuun.
- Aloitus vaatii tämän ikkunan JU:n ”kone vapaa” -merkinnän, load5 < 16 ja sen, ettei Unity, xcodebuild, dotnet tai Simulator ole käynnissä.
- `window5/window_guard.py` tarkistaa ehdot vain lukuoperaatioin. `window5/run_guarded.py` valvoo yhtä omaa prosessia, tarkistaa ehdot viiden sekunnin välein ja pysäyttää oman prosessiryhmän ennen määräajan umpeutumista. Se ei ajasta eikä käynnisty itsestään.
- Blender ajetaan myöhemmin valvojan kautta ja parametrilla `--python-exit-code 1`. Python-virheen jälkeen työn tulosta ei tulkita onnistuneeksi pelkän Blenderin tavallisen poistumiskoodin perusteella.
- Valmistelussa tehty ensimmäinen tarkistus esti ajon: aika ei ole alkanut, ikkunan5 vapautusmerkintä puuttuu ja Unity/dotnet ovat käytössä. Mitään raskasta prosessia ei käynnistetty.
- Uuden työn Tripo- ja ImageGen-kutsut 0, krediitit 0. Tavoite on malli ja QA ikkunan sisällä; valmistumista ei luvata ennen geometrian tarkastusta. Keskeneräinen työ tallennetaan T7:lle viimeistään ikkunan lopussa.

## Säilytettävä lähde

Valittu Turku A multiview #2336:
`output/linnat-tripo-2335-2337-20261115/turku-A-multiview/turku-A-multiview-2336-max-original-8k.glb`.

- SHA-256 laskettu uudelleen: `a6b3c5dca93734ec902c174cdad4df55e9c8a84c2abc4b1fd5b74c752b134455`.
- 82 131 820 tavua; 1 976 029 kolmiota; 1 136 724 POSITION-accessorin tietuetta. Näyttimen käyttämä kärkimäärä voi erota tästä määritelmästä.
- Historiallinen Tripo-job: `1f614393-1834-43fe-a64e-16b702fc142b`, 65 krediittiä. Tämä ei ole uusi tilaus tai uusi kustannus.
- Yksi mesh/primitive, node translation `[0.0010376125574111938, 0, 0]`. GLTF: Y ylös. Värikuva 8192², normal ja metallic/roughness 4096² ovat olemassa olevia lähdekuvia.
- Alkuperäistä GLB:tä ei muuteta. Työ tehdään erilliseen ehdokkaaseen. Ei koko ulkokuoren yleistä decimointia, tasoitusta, uutta teksturointia tai geometrian skaalan korjausta tämän tilauksen lisätyönä.
- Alkuperäisen näkymissä piha ei ole selvästi avoin ja esilinna kiertyy mallin usealle puolelle. Tämä on aiemmin kirjattu lähdemallin varaus; sitä ei korjata koko rakennuksen uudelleenrakentamisella.

## Huoneet ja lähdepohja

RHS:n painetut sivut 203 ja 205 on katsottu kuvina. Paikalliset tiedostot ovat `output/turku-rhs-2441-2444-20261116/rhs-painettu-203.png` ja `rhs-painettu-205.png`. Alkuperäinen RHS-PDF ja SK:n lähdeselvitys säilyvät saman kansion alla. ArkMP 1903_014:n alkuperäinen kuva ja leikkausarvio säilyvät kansiossa `output/turku-arkmp-2445-2446-20261116/`.

| Huone | Paikka ja taso | Rajaus |
| --- | --- | --- |
| M303 Jordanin kamari | Itätorni, kerros 3 | Pieni itään ulkoneva kamari; ei koko tornin levyinen sali |
| M501 Herttuan kamari / sakaristo | Itätorni, kerros 5 | Erillinen huone, ei sen eteläpuolinen N501 |
| G301 Iso linnantupa | Eteläsiiven länsiosa, kerros 3 | Lähteen pohjan mukainen huone |
| G501 Eteläinen sali | Eteläsiiven länsiosa, kerros 5 | Kerros 4 jää tämän ja G301:n väliin |
| J503 Kuningattarensali | Pohjoissiiven länsiosa, kerros 5 | Ei J501-kamari eikä J307:n keskiaikainen sali |

Kerros 4 näkyy välitasona kerrosten 3 ja 5 välissä. ArkMP:n holviesimerkki ei oikeuta holvaamaan kaikkia huoneita. Lähteistä varmistumattomia huonekorkeuksia, materiaalien täsmäsävyjä ja seinän paksuuksia merkitään arvioiksi; uusia huoneita tai portaiden historiallisia yhteyksiä ei keksitä.

## Toteutusjärjestys ikkunassa

1. Tarkista uusi posti, lähdehash, muut käynnissä olevat työt ja ajovartija. Avaa mallin työkopio. Rekisteröi mallin paikalliset akselit RHS:n itä/länsi/pohjoinen/etelä-suuntiin tornien, siipien ja pihajärjestyksen avulla; tallenna perustelu ja katselukuvat. Aiemman viiden kuvan paikallisia +X/+Z-tunnuksia ei tulkita suoraan ilmansuunniksi.
2. Rajaa pihan suuntaiset avauspinnat kolmesta siivestä. Ennen leikkausta tallenna poistettavan alueen maski ja muuttumattoman ulkokuoren vertailuaineisto. Jos lähdemallin tulkinta ei mahdollista lähdeuskollista huonejakoa säilyttäen muun ulkokuoren, raportoi täsmällinen ristiriita PT:lle; älä julkaise arvattua valmisversiota.
3. Rakenna porrastettu leikkaus: pihaan päin auki, ulkopuolen kuori ennallaan; huoneille lattiat, sisäseinät, katon/alakaton alapinnat ja riittävä syvyys. M303:n pienuus ja kerros4 tarkastetaan erikseen. Säilytä alkuperäisen mallin node, paikka, mittakaava ja muu ulkokuori; ainoastaan tilatut avauskohdat ja sisärakenteet muuttuvat.
4. Käytä Temple-reseptin lähdekohtaista tasojen ja UV:n käsittelyä soveltuvin osin. Ei Temple-mallin koordinaattien tai koko pinnan tasoitusmaskin kopiointia Turkuun. Pidä uudet sisäpinnat hillittyinä. Säilytä lähdekuvat; uusi kuvan generointi on kielletty.
5. QA: lähdehash ennallaan, node/transform/bounds ja muuttumattomat ulkopinnat vertailtu; avauspinnat, huoneiden sijainti, kerros4, M303, oikea puoli, läpäisevyys, normaalit ja UV:t tarkastettu. Tallenna mallin todellinen kolmio-/materiaalimäärä ja tiedostokoko sekä erot lähtömalliin. Älä kutsu teknistä QA:ta KK:n hyväksynnäksi tai peli-integraatioksi.
6. Kolme kokokuvaa, pisin sivu tasan 1000 px: piha edestä, piha vinosti, ulkoa takaa. Sama kokonainen malli kaikissa; nimikkeet erillisessä kuvatekstissä. Toimita ehdokas ja QA PT:n kautta KK:lle vasta, jos paikallinen QA hyväksyy.

Sisäinen aikavaraus: ensimmäinen osa lähde-/suuntarekisteröintiin, keskiosa rajattuun rakentamiseen ja viimeiset noin 30 minuuttia QA:han, kuviin sekä tallennukseen. Raskas työ päättyy viimeistään 24.00 EET myös keskeneräisenä. Ei peli- tai julkaisuhaaran muutoksia.

## Suljetut työt ja jonon korjaus

Temple2403 on KK:n hyväksymä; NS:n pelivaihto on erillinen. Grand Châtelet'n oma osuus pysyy suljettuna.

Rooman Colosseumin kitkentäkuva #2258 kuuluu toiselle chatille ja on jo toimitettu. KK hyväksyi sen #2267:ssa sanoin ”VASTAA TILAUSTA, EI TOISTA OTTOA” (`8454b4c4bb4c12327fdbf52af892d2da36ec2198`). `ROME-QUEUE-AUDIT.md` sisältää tavuvarmennetun kuvan ja päätöksen. #2459:n yleinen jonomaininta ei yksilöi uutta korjausta eikä syrjäytä tätä kieltoa. PT:lle lähetetään tieto vanhentuneesta jonorivistä; uutta Rooma-otosta ei käynnistetä.
