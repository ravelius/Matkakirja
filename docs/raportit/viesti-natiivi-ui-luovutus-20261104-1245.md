# Natiivi-UI: luovutus 4.11.2026 klo 12.45 (konteksti 25 %, pehmeä raja)

Edellinen: viesti-natiivi-ui-luovutus-20261104-0532.md (haara natiivi-ui/luovutus-20261104-0648, PR 6242 auki). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto.

## Tehty
- **Keisarin nosto (PT:n erä): ei korjattavaa.** VIKA korjattu 200f73222 + e971e1992, iso iPad ea2d6912f huippu 3021 Mt; KK hyväksyi 3.11. 21.3x; kuvat ämpärissä; ☰ tauolla ja lopetusruutu 2.200:n mukaan. Yhdistelmässä ja julkaisija/runko-218-koe:ssa, ei TF:ssä. Odottaa junaa. Työlista päivitetty.
- **Veneet vain veden päällä:** VS tekee itse (vastattu VS:lle). NS:n siltaleikkaus 2f9dd10c3 + b6d478a40 puuttuu striimi-varista; pysyvässä versiossa VS ja NS sopivat.
- **Kartan kääntö (PT 12.38, omistajan kortti "Kelpaa, koe, ei junaan"; suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-striimikartta-pohjaksi.md, MUUTOS kohta 4):** proto natiivi-ui/kartan-kaanto-219 ebc8ce01e (7f64cd657:n päällä), wt/proto-natiivi-ui-kaanto. Peli-testit 827/827, Kartta-testit 604/604, Unity todistamatta.
  - Ele oli jo olemassa (kaksi sormea, KiertoEstin 15°); piirroksen automaattinen suoristus ei toimi, kun Striimi (pariisissa = Karikatyyri && …), joten uutta elettä ei tarvittu.
  - Lisätty: Suorista-nappi kun käännetty (KameraEleet.Kaannetty 8°/3°, PiirrosKerros.Haivytys + Suorista: vain pohjoinen, kallistus pysyy), kuumailmapallo pystyssä ruudulla (PiirraAjelehtijat).
  - Koodista luettu, kuvista todistamatta: nimet VaakaTekstit (kameraan päin), maavarjo ruututasossa (Karttaesineet.AsetaVarjo). Saapuminen toisesta maasta kääntää yhä pohjoisen ylös (PalloKierto, Webin malli); kaupungin sisäiset ajot säilyttävät kulman.

## SEURAAJAN JONO
1. **Mac-kuvat:** esikatseluvuoro pyydetty JU:lta (viesti jonossa ~12.43). "ESIKATSELU NYT" → aja itse: tyokalut/esikatselu.sh ebc8ce01e /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kartan-kaanto/sk-kaanto.txt ipad --batch (noin 15 min, linja 2). Kuvat: z13/z15/z17 × 0/45/135/225, kallistus 50 + 135, pallo, ele 60 + nappi. Skenaariossa nappia ei paineta (koordinaatit puuttuvat): katso kuvasta, tarvittaessa ui napauta x y.
2. **Sha, kuvat ja muistiarvio PT:lle (≤ 3 riviä).** Arvio vielä tekemättä: komento elavakartta rivit suunnittain, Mac ei kerro laitemuistia. Laskupohja: tasaisessa näkymässä 4:3-ruudun kääntö 360° kattaa ympyrän, jonka halkaisija on lävistäjä = 1,64 × ruudun ala, jos kaikki palat jäävät välimuistiin (katto: maximumCachedBytes); kallistus kasvattaa enemmän. Raja 4080 Mt. Tarkista tuloksista ennen kuin ilmoitat luvun.
3. **iPad vain JU:n vuorolla, ja vasta kun 7f64cd657:n muistiajo on alle 4080 Mt** (lokit/julkaisija-muisti-z10-7f64cd657 oli 12.3x kesken). Neljä suuntaa, kallistus, kolme zoomia, muisti ja ruutuaika.
4. **KS:** tuo kirkon ja pohja-alueen A haarassaan karttaseppa/nd-kirkko-219 (7f64cd657:n päällä, ei vielä pushattu); lupasi tiedostolistan ja sijainnin rivinä (noin 48,8530 N, 2,3499 E). Minun tiedostoni: KameraEleet.cs, PalloKierto.cs, PiirrosKerros.cs, PiirrosKerros.Animaatiot.cs, KameraEleetTestit.cs (KS tietää). Kirkko kääntötestiin, kun se on pelissä.
5. **Keisarin `ui tarina viimeinen-keisari`:** JU ajaa seuraavassa yhdistelmä- tai kuva-ajossa (ei z10-kokeissa), rivi sinulle ja PT:lle; VIKA → selvitä.
6. Vanhat: salin xf-vika on PK:lla (30ec1ddd3), ei rinnalle. Soikiopari: jos KK hylkää, VarjoKuva/0,5 (7f0ccc451:n TraileriLiike) ja kysy PT:ltä. Elävä kartta vaihe 2 vasta suunnitelman jälkeen. TraileriLiike mk-traileri__varjo siivous kun koskee tiedostoon. `palatsi kopiot 1` Testihypyistä: kysy PK:lta muistityön jälkeen.

## Muuta
- zsh: `$T:A` on muunnin (git show "$T:Assets" rikkoo polun), käytä ${T}:; rivillä ei `=====` (zsh laajentaa).
