# Astra: #342, korjattu kahden seinän paikallinen koe

16.10.2026 · OFFGAME · **Rajattu myönteinen lausunto paikalliseen palautekokeeseen.** Pieni näkyvä rytmivaihtelu toimii kahden kohteen näkyvillä pinnoilla. Kuuden kiinteän näkymän yleisilmeen hyötyä ei ole osoitettu. Tämä ei ole kokonaislaatu- tai pelipakettihyväksyntä.

Arvioitu juuri: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/model-loop-owner-20261015/task342-work/candidate-visible2-parallel`. Katsottu kaikki 14 uutta alkuperäistä PNG:tä ja kuusi V3-lähtökuvaa, yhteensä 20. Kaikkien 20 kuvan SHA256:t täsmäävät omiin render-prooftiedostoihinsa. Kaikkien kolmen LOD0/1/2-ehdokas-GLB:n ja V3-lähtötiedoston pinnit täsmäävät pilot-proofiinsa; actual LOD0 -uudelleentuonnin pinni täsmää uuteen GLB:hen. Ennen/jälkeen-parien kamerat, mittakaava ja kuvakoot täsmäävät. Kiinteiden kameroiden muuttumattomuus on kirjattu tuottajan render-todisteeseen.

| Kohde | Kuva-arvio |
|---|---|
| 3dglobfp/13652 | Ovi siirtyy keskeltä vasemmalle, ikkuna keskelle. Pieni epäsymmetria näkyy selvästi ja antaa käyttökelpoisen paikallisen variaation. Kuvissa ei näy uutta venymää, paneelien tuplausta tai aukkoa. Vanha alaosan maapeitto jää. |
| way/257208012 | Ovi siirtyy oikealle ja ikkuna keskelle. Näkyvä keskiosa muodostaa ensimmäisen kohteen kanssa eri suuntaisen parin. Reunojen mustat peitot jäävät; koko seinää tai piiloon jääviä liittymiä ei hyväksytä visuaalisesti. |
| Kontrollit 3dglobfp/379 ja 3dglobfp/320 | Säilyvät silmämääräisesti samoina. Kummankin ennen/jälkeen-parin suurin RGB-kanavaero on 1 / 1. Tämä ei tarkoita PNG-tavujen identtisyyttä. |

Tunnisteet on tarkistettu renderin views-taulukosta pilot-proofiin. Pilot-proofin mapping-viite ja mappingin source-replay-viite täsmäävät. Tunnisteita ei päätelty pikseleistä eikä geometrian kohdistusta ajettu uudelleen.

**Kaikissa kuudessa kiinteässä näkymässä yleisilme säilyy.** Hutong_ilma- ja ilma-kuvissa ei erotu todistettavaa korttelin rytmiparannusta. Aukio-, Beihai-, Jingshan- ja Taihedian-kuvissa ei näy uutta poikkeamaa V3-vertailuun. Suurimmat RGB-kanavaerot ovat hutong_ilma 1, ilma 3, aukio 1, beihai 1, jingshan 1, taihedian 1; vähintään 20 kanava-arvon muutospikseleitä on yhteensä 0. Paikallinen lähikuvahyöty ei siis osoita kaupunkinäkymän parannusta.

Päätekijän `parent-saved-candidate-readback.json` raportoi uuden tangenttiin projisoidun siirron läpäisseen alkuperäisen normaalisiirtymärajan: maksimi 4.931839 µm, raja 20 µm. Luin ja pinnitin tuloksen, mutta en toistanut teknistä auditointia. Samassa readbackissa 48 POSITION-riviä ovat muuttuneet ja omat korkeudet, UV:t, normaalit, materiaalit, kuvat, lähde51 sekä V3:n 72 GLB:tä ja manifesti säilyvät. LOD1/2:n visuaalista laatua tai liikkuvaa LOD-vaihtoa ei arvioida LOD0-kuvista.

Pintatarkistuksen tiedosto on `actual-static-surface-crossings-selected2.json`. Se raportoi nolla uutta ei-sokkelileikkausta ja kaksi säilyvää maaleikkausta. Niiden yläleikkauskorkeudet laskevat noin 55.27 ja 19.63 mm. Vanha maapeitto ei korjaannu: tämä ei hyväksy fysiikkaa, kuljettavuutta, koko mallin kollisiottomuutta tai peittyneiden liittymien laatua. Puiden tasokortit on rajattu teknisen pintatestin ulkopuolelle ja vanhat sokkelikontaktit käsitelty erikseen.

**Edellinen `candidate-visible2` on failed/superseded.** Sen `rejection.json` kirjaa normaalisiirtymäksi 25,585136 µm yli 20 µm rajan. Se säilyy hylättynä kokeiluna; sitä ei hyväksytä tämän uuden arvion kautta. Korjattu juuri ja sen uudet tiedostopinnit ovat tämän lausunnon ainoa nykyinen kohde.

Johtopäätös: nämä kolme GLB:tä ja kaksi näkyvää paikallista muutosta sopivat rajatun palautekeskustelun aineistoksi yllä olevin rajoituksin. Ei laajennusta muihin rakennuksiin, uutta 72 GLB:n kaupunkipakettia, native52:ta, V3:n korvausta, pelitoimitusta tai julkaisua. Ion-, pelin normaalien/valaistuksen, liikkuvan LOD:n, laite- ja omistajahyväksynnät jäävät avoimiksi. Muutettu vain tämä MD/JSON-raporttipari. Tarkat kuva-, GLB- ja todistuspinnit ovat JSONissa.
