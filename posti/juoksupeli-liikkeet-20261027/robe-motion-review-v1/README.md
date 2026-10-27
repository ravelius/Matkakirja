# Kaavun nostoliikkeet — tekninen tarkistuspaketti

Kaksi uutta liikettä molemmille Puyi-malleille: `jump_robe` 0,96 s ja toistuva `stairs_robe` (perus 0,657895 s / viitta 1,337719 s). Vasen käsi nostaa etuhelmaa. Ei uusia Tripo-kutsuja eikä krediittejä.

## Tuonti PT1182

`motions/puyi-perus-liikkeet.glb` ja `motions/puyi-liikkeet.glb` sisältävät vain luurankohierarkian ja liikkeet. Tässä ensimmäisessä kumulatiivisessa kirjastossa on aiemmat yhdeksän parkour-leikettä ja nämä kaksi uutta. Säilytä muut päämallin leikkeet. Samannimiset korvaavat aiemmat; päämallin geometriaa ei korvata.

Kaavun liike tarvitsee lisäksi `morph/<var>/robeHemLiftLeft.bin` ja `manifest.json`. Pelkkä luuanimaatio liikuttaa kättä mutta ei nosta kangasta. Manifesti sisältää POSITION- ja NORMAL-deltat sekä täsmälliset painokäyrät. Pidä paino 0 kaikissa muissa liikkeissä, myös kirjaston ulkopuolisissa. Portaissa paino on 1, joten siirtymästä pois on palautettava 0.

`tools/apply_robe_morph.py BASE_AFTER_BONE_IMPORT.glb morph/<var>/manifest.json NEW.glb` on riippumaton Python-vakiokirjaston offline-työkalu. Se tarkistaa geometrian, indeksit, luupainot, hierarkian ja bind-matriisien SHA:t, vaatii uudet luuleikkeet valmiiksi tuoduiksi, lisää muodonmuutoksen ja nollaradan muille leikkeille ja kirjoittaa vain uuden tiedoston. Älä ohita tarkistuksia, jos lähde ei täsmää. Nykyiseen peliin yhdistettyä mallia ei ole testattu täällä. Uusi kainalogeometria vaatisi morfin uudelleensovituksen.

## Ajoitus

`jump_robe`: sama ulkoinen juuri kuin `vault_low`; `tools/robe_root_curve.py` antaa tarkistetun radan. +Y ylös, +Z eteen, 1,35 m hahmo. Ei tavallisen juoksuliikkeen lisäsiirtoa juuren päälle. Hyppy alkaa ja päättyy aiemman vault_low-juoksun asentoihin; morfin paino on päissä 0. Perus 0,5 m este, ei mielivaltainen pitkä tai korkea hyppy.

`stairs_robe`: sama 0,5 nousu/etenemä (0,16 m / 0,32 m) kuin run_upstairs. Juuri seuraa pelin kaltevaa kulkureittiä; ei lisäkallistusta hahmolle. Jalkoja ei ole lukittu yksittäisiin askelmiin. 0,18 s pelisiirtymää ei ole varmennettu; luiden ja morfin on käytettävä samaa aikaa ja häivytyspainoa.

## QA ja rajat

Lopullisista GLB-esikatseluista koko verkon lattia/kalteva taso 960 Hz, paikalliset käsi–kangas-kolmiot 240 Hz, hyppyeste 480 Hz, nivelkulmat 240 Hz ja silmukan alku/loppu. Molemmat läpäisevät. Offline-morfin uudelleentuonti tuotti täsmälleen samat ihotetut kärjet 194 asennossa per hahmo. Tämä ei ole pelin ajonaikainen testi eikä koko vaatteen törmäystodistus.

Kuvat ovat paikallisia tasaisesti valaistuja tarkistuskuvia, eivät pelikuvaa. Laajat v8-kuvasarjat ja viimeisen käsikorjauksen lopulliset kuvat eroteltu VISUAL-REVIEW.jsonissa. Viitan aiempi kainalokorjaus on edelleen erillinen avoin työ.
