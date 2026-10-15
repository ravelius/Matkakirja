# Square50: natiivipilotin tekninen auditointi

**PASS rajatulle natiivipilotin tekniselle toteutukselle. Kuvallinen arvio, koko native50-kierroksen sulku ja vienti ovat erillisiä portteja.** Uusi PT-kirje luettiin kokonaan ja blob4935df513c57afe279566e79379c2bc6835bab8a varmennettiin.

## Toteutunut geometria

Kaikki4 F32-kärkiarrayt, kolmioindeksit ja triangleUV-arrayt ovat täsmälleen samat kuin aiemmin auditoidussa lähdesuunnitelmassa. Paketoitu plan, aiempi auditointi ja actual-readback sidottiin SHA:lla samaan aineistoon. Uudelleen lasketut reunat/kärkilinkit ovat suljettuja ja orientoituja; verkot yhtenäisiä, tilavuudet positiivisia ja kaikki kolmiot nollasta erillään.

| Kohde | Kolmiot | Euler | Todellinen maasta huippuun m |
|---|---:|---:|---:|
| `relation/8607825` | 176 | 2 | 16.000000229 |
| `relation/8847722` | 286 | 2 | 37.939999390 |
| `relation/8848142` | 356 | 2 | 37.000001068 |
| `relation/8848388` | 528 | 0 | 12.799999847 |

Yhteensä1346 kolmiota. GreatHallin alkuperäisen F32-sisäpihan ja kaikkien kolmioiden XY-projektion leikkaus on0 m², sisältäen katot, hartiat ja alapohjan. Kaikkien neljän projektio vastaa sourceF32-pohjaa0 m²:n erolla. Suunnitelman nollat päällekkäisille pinnoille ja itsensä leikkauksille siirtyvät natiiviin täsmällisen array-identtisyyden kautta.

## Lähteet ja laattaomistus

Kaikki277 manifestin SHA:ta täsmäävät. Täsmälleen8 ilmoitettua tiedostoa eroaa49:stä. Kaikki 169 alkuperäistä source-inputs-/tekstuuritiedostoa, luokitteludata ja225-rekisteri säilyvät tavutarkasti; tiedostoja ei poisteta. Neljä massaa ovat registryMember=false ja supplementalPlainMasses-listassa, eivät223/225-rivien korvauksena.

Helperin build suoritettiin muistissa kaikille24 testilaatalle ilman Blenderiä. Jokainen massa syntyy kerran: museo, muistomerkki ja Maon muistohalli laattaan(2,0); GreatHall laattaan(1,0). Puoliavoimet centroidrajat välttävät duplikaatit. Museo ja GreatHall ulottuvat pohjoisessa j0:n yli: viejä ei saa ottaa niitä toistamiseen naapurilaatan overlap-haulla eikä leikata omistajalaatan yli ulottuvaa osaa vahingossa. Lopulliset GLB-boundsit ovat vientiportti.

## Materiaalit

Source stage8_scene-diff muuttaa vain katto_kulta-kutsun tint-parametria. Trial valitsee[1,1.08,.90]; actual-readbackin RGBA MULTIPLY B vastaa sen float32-arvoja: [1.0, 1.0800000429153442, 0.8999999761581421, 1.0]. Vanhat[1,.86,.72,1] ovat vain vertailutietona. Alkuperäistä kattokuvaa, normalia, roughnessia tai muuta palettia ei muuteta lähdedeltassa.

Tarkastettu applier luo uuden plain-materiaalin RGBA(.62,.60,.55,1), roughness.85 ilman image-nodea. Verkoksi käyttää olemassa olevien materiaalien palautuslambdaa, joten se ei rakenna vanhoja materiaaleja uudelleen. Skripti assert-tarkistaa muut materiaalit ja alkuperäisten kuvien SHA:t, muuttaa kattomateriaalista vain MIX B:n ja tallentaa ehdokkaan ennen erillistä neutraalia renderöintiasetusta.

Readback-raja: JSON sisältää tint-arrayt, mutta ei kaikkien nodejen ennen/jälkeen-taulukoita tai uuden materiaalin node-taulukkoa. Muiden meshien/materiaalien/kuvien säilyminen perustuu omistajan todelliseen assert-suoritukseen ja tarkastettuun applieriin; Sol ei avannut Blenderiä uudelleen. Kuvallinen keltaisuuden hyväksyntä on erillinen.

## PT295: toimitusvalinta ratkaistu

PT295 ja owner-height-decisions295.json valitsevat Taihedianin nykyisen36.65 m sekäway/688124109:n nykyisen noin8.1 m toimituskorkeudeksi. **Valinnan ristiriita on ratkaistu toimituspäätöksellä.** Päätös sanoo independentPhysicalSourceVerification=false ja datumOrGroundModelChanged=false.

Aiemmat numeeriset sourceTolerance=false-tulokset säilyvät historiallisina49:n raportissa. Niitä ei muuteta trueksi eikä valittuja korkeuksia nimetä uusiksi mittauksiksi. Way/688124109:n29.7 on mallipohjainen arvio, ei rawOSM-height-tagi. Sen7.5-rakenneparametria ei kirjoiteta8.1:ksi: valinta koskee nykyistä noin8.102-geometriaa. Root-LAHTEET.md kirjaa eron ja viittaa muuttumattomaan source-inputs/LAHTEET.md:hen.

## Vientiguard ja jatko

Vie ja vie_laatta nostavat edelleen RuntimeErrorin ennen vanhaa vientiä. Neljän massan natiivipilotti ei ohita sopimus276:n adapteria eikä hyväksy72/96GLB-budjettia, peliä, R2:ta tai mainia. Jatka riippumattomaan kuvalliseen arvioon ja lopullisen50:n pinontaan/kuuteen näkymään.

Vain nimetyt MD/JSON-raportit kirjoitettiin. Ei Blenderiä, mallilähteen muutoksia, delegointia tai viestejä muille.
