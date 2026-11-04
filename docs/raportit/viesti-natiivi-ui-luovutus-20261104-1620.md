# Natiivi-UI: luovutus 4.11.2026 klo 16.2x (konteksti noin 31 %)

Edellinen: viesti-natiivi-ui-luovutus-20261104-1412.md (kääntö, iPad-ehto, vanhat kohdat). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto.

## Tila
**Omistaja 15.42:** nousukuvat 9d2b17f31 kelpaavat, koko ja paikka pysyvät (kortti KK:lla, lokit/nui-nousu-35-9d2b17f31-20261104/kk/). PT hyväksyi C1:n korjauksen simulla.

**Proto `natiivi-ui/nousu-pieni-219` 5902b79bd** (wt/proto-natiivi-ui-nousu-pieni), EI junassa; KK: ei junaan ennen kuvaa KK:lle. Kolme commitia 9d2b17f31:n päälle:
- 27e10a669: `Matkakirjakortti.NaytaLappuna`, `Saapumisesitys.LuentaEsittelynJalkeen`: merkintä lappuna esittelyn ajan; luenta avaa ja kirjoittaa. Ohita ja "ei luentaa" kirjoittavat `kortti.Kirjoita()`:lla. `TraileriLiike.NousuLepo(…, nimiYla, este)`: neljä aluetta kortin ympärillä; `KeskeltaRajat`; `MatkakirjaEste` = `Matkakirja.Rajat`.
- 4e03c8ee6: nimen raja vain puhelimella (`!UiKerros.Tabletti`), koska omistajan hyväksymä tabletin koko ja paikka pysyvät.
- 5902b79bd: `PeliOhjain.LuentoTulossa` ja `HiljaisuudenEste` "luento tulossa" (KK: esittely → luenta → kohtaus); `Luentavahti`: auki oleva kortti ei pienene, ennen kuin sanat on kirjoitettu.

**Ajo** lokit/nui-nousu-kortti-5902b79bd-20261104 (kuvat kk/, konsoli-*.txt, nousu-*.mp4). Vietiin KK:lle ja PT:lle 16.2x.
- Kunnossa: kortti, kamera Pariisissa esittelyn ja luennan alun ajan, iPad vaaka traileri 1, iPhone-vaakana nimi kokonaan.
- **Vika: iPhone vaaka, traileri 1 peittää Lontoon kortin oikean puolen** (lepo -18,-66, kk/4). Todennäköinen syy, todistamatta: este luetaan, kun kortti on vielä lappu, ja kertojan puhe avaa sen heti perään (puhe alkaa 30 ms kuvan jälkeen). Tarkista tekotapa `Luentavahti` / `Muunna`; esteeksi avoimen kortin mitat, kun trailerin puhe alkaa.
- **Todistamatta: kohtaus luennan jälkeen ja kortin pieneneminen.** Luenta 30,7 s; tallenne 55 s loppui ennen sen loppua. Ajo-skriptiin `sleep 75`.
- Ajon `hiljaa` on vain AudioListener.volume 0 (Komennot.cs:500): puhe ja "kerronta ohi" syntyvät silti. Lopetus: uudessa ajossa ei `hiljaa`-riviä.
- Riski: jos puhe ei koskaan ala viiveen jälkeen, `odottavaLuento` voi jäädä, ja elävä odottaa OdotusMaxS (600 s). Tarkista, jos kohtaus jää pois.

## SEURAAJAN JONO
1. **iPhone vaaka:** korjaa kortin peitto samaan haaraan, `tarkista.sh`, pyydä JU:lta simu (L2 + iPad13 + iPhone18). Skripti: kopioi lokit/nui-nousu-kortti-5902b79bd-20261104/ajo.zsh uuteen kansioon, vaihda sha, tallenne 75 s. Ajokutsu: `SIMU_MUISTIRAJA=16 zsh tyokalut/simu-lukko.sh kaari natiivi-ui <simu> -- zsh <kansio>/ajo.zsh ipad|iphone`. Todista: kohtaus vasta luennan jälkeen ja kortti ei peity. iPad-vaakakuvat käännetään (`sips -r -90`), iPhone-kuvat ovat jo vaaka. Kuva ja tulos KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a), rivi PT:lle. Vasta KK:n sanalla merge-pyyntö.
2. **Lippu 99eb9931e EI kelpaa Mac-kuvista** (lokit/esikatselu-20261104-154037 Ranska: 135 ja 225 ok, 000 yläreuna leikkautuu, 045 kangas ruudun yli; -154305 Norja: kamera osui väärin, lippu 70,42 / 30,39, aja-rivi 65,0 13,0 0,35 väärä). Mac-ruutu 640×480, lippu suurempi kuin simussa: tarkista ensin simulla (JU:n vuoro). KS odottaa: ND:n iPad-haara tehdään ilman lippua, kunnes hyväksytty. Norjan paikka on kaukana testin keskipisteestä: selvitä, onko 70,42 oikein.
3. **Vanhat:** 13.56-luovutuksen kohdat 4 ja 5.

## Levy
Raja 25 Gt, 28 Gt vapaana 16.2x. Poistettu kymmenen omaa puhdasta worktreetä (piirros-eleet, -kyltit, -nimiot, -nostot, -sillat, -suora, -tahti, -veneet, suorista, koealue; haarat tallella) ja vertailun app-kopio. Lisää puhtaita omia worktreetä on jäljellä noin 9 kpl (500 Mt kukin); poista app-kopio joka ajon jälkeen.
