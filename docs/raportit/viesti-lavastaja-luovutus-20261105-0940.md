# Lavastajan luovutus 5.11.2026 09.4x — LUE TÄMÄ ENSIN, sitten -20261105-0920

Täydentää -0920:tä (origin/lavastaja/luovutus-20261105-0920), jonka kohdat ja PT:n sitova järjestys pätevät: 1) kk2r:n 23 paria täysikoossa, 2) levyt ja kuvapari, 3) irto ja räystäät useammalta kameralta. Yötila: TF ja viennit vain omistajan pyynnöstä, JU:n kautta. Ei vientejä. Syy luovutukseen: omistajan uudelleenkäynnistys (PT 09.38). Tiedot: muuri/KORJAUS.md loppu.

## Tila 09.38
Ensimmäiseksi tarkista koe_v85r. Y/levyt/koe_v85r.zsh oli käynnissä: 12/19 palaa tehty, odotti käännöslukkoa (/tmp/matkakirja-kaannospalvelu.lukko). Pid Y/levyt/koe_v85r.pid (PPID 1, oma ryhmä); loppurivi KAIKKI PALAT VALMIS Y/levyt/koe_v85r.log:ssa. Y = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen.
Jos ajo kuoli: aja uudelleen. Lähde q säilyy (.valmis), mutta skripti tekee kaikki palat alusta (noin 2-3 min/pala) eikä ohita valmiita; lokia ei jatketa, vaan katkennut pala on tehtävä joka tapauksessa uudelleen. Ei vahingoita v115:tä.
Kk2r:n parit, kuvapari ja v115:n korjaus ovat yhä tekemättä, kuten -0920:ssä.

## Tehty tässä
- Palan 1-2 valo: syy todistettu. tausta-v96.zsh → nousu_kivi.py → glb_tiivista.tiivista poisti viittaamattoman valo_rgbm-kuvan. Toistettu v95:n kopiolla (17 → 16 kuvaa). Korjattu kielletty-rakennukset/tyokalut/glb_tiivista.py: valo*-kuva jää, jos UV1 on; sama testi 17 kuvaa, atlas sama. Työkalu on _tyo-kansiossa, ei gitissä. Muiden kutsujien tuloksia ei käyty läpi; v115:n muissa 19 kk-tausta-?-?-lod0-palassa valo on.
- PK:n kolme ovikohtaa mitattu v115:stä; PK:lle ja PT:lle vastattu. Kuvia ei katsottu.

## Avoin (PT 09.2x-09.3x)
- Pala 1-2: leivo valo_rgbm uudelleen levykorjauksen jälkeen, SAMASSA ajossa, noin 2,5 min (asetukset kk2r/leivo.zsh, katto_takaisin.py takaisin/erota). Ei kk2r/leivottu-palaa, jos geometria muuttuu. Älä vie.
- Ovikohdat, kun koe_v85r on tehnyt palat 3-4, 0-4, 1-1: katso solut.json ja lod0, poistiko levykorjaus ne. 房子26 (3-4, y 0,4) ja 房子11 (0-4, y 0,37/0,35) ovat irto-listalla; 房子11:n y 0,31 ja y 0 sekä 弘义阁 (1-1, y 0,81, 68 m²) eivät. Lisää listaan tarvittaessa. PK:n väittämää V4_marmoria ei löytynyt 弘义阁:lta vaakapintana. PK:n kuvat: lokit/tarkastelukuvat-380664d56-090152/ovi-房子26.png, -405d9d716-091159/ovi-房子11.png. Ei junaan.
