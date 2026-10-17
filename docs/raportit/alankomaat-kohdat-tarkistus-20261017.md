# Alankomaiden kohdat.json (i-napin ympyrät): riippumaton tarkistus, 17.10.2026

Tarkistettu tiedosto: proton `Assets/Matkakirja/Linssit/Resources/Museo/alankomaat/kohdat.json` (64 teosta, 176 ympyrää, versio 13.10.). Korjattu versio on mainissa
`docs/kohtaukset/museoteokset/kohdat-alankomaat.json` (191 ympyrää). **Linssiseppä vie sen protoon tavu tavulta** (`cmp`); proto-gitiin ei kirjoitettu.
Menetelmä kuten Ranskalle (`ranska-kohdat-20261017.md`): 6 Sonnet-agenttia, omat haut (kaksi lähdettä per väite), kuvapaikat tarkistettu Commons-kuvista.

## Tulos
- 176 ympyrästä 119 OK, 47 teksti/otsikko korjattu, 10 pelkkä siirto (yhteensä: teksti 48, paikka 16, otsikko 8 muuttunutta); ei poistoja.
- Lisätty 15 uutta varmennettua ympyrää teoksille, joilla oli vain yksi ympyrä (kuvasta nähtävät tai kahdella lähteellä).
- Siirretty ympyröitä, jotka olivat alle 0,12 toisistaan (mm. Yövartio SK-C-5, Tulp mauritshuis-146, Steen SK-C-216, SK-A-45) tai ohi kohteesta.
- Varmistumattomat väitteet korvattiin kuvasta nähtävällä tai "museon mukaan" -muotoilulla; muutetuille teksteille lisätty lähteet (title alkaa "Tarkistus:").

## Merkittävimmät korjaukset
Yövartio (Heede on Rijksmuseon mukaan ruokakauppias), Hals SK-A-135/fhm-os-i-116 (Manetin ja Sargentin kopiot erillisiä; liinojen väri vain museon tutkimus), Steen SK-C-216 (kielto "joissakin kaupungeissa" pois), Rembrandt RP-P-OB-602 (Pietari-tulkinta → Matteus 19), SK-A-199 (NGA-viittaus koski eri maalausta), SK-C-149 (koira katsoo ovea, "vaatimaton koti" pois), SK-A-404 (kolikko), vgm-s0031v1962 (viite on Lontoon version kuvaus; Amsterdamin F458:ssa ei roikkuvaa terälehteä — teksti korjattu), SK-C-6 (tarkastaja nousee tuoliltaan).

## Avoimet / heikot
- Pitkään jäänyt rakenne: 10 teoksella oli alun perin vain 1 ympyrä; 2 on yhä (RP-F-AB12278-Z, SK-A-2338) → ehdotus: lisää ympyrä kuvasta kun joku katsoo teokset (Natiivi-UI/SK pyydettäessä).
- Alkuperäinen tiedosto ei noudata Ranskan sääntöjä (teksti 70–150, otsikko ≤ 32): 27 tekstiä > 150, 7 < 70, otsikoita max 37 merkkiä. Niitä ei muutettu, ellei väite korjattu; päätös PT:ltä, tarvitaanko tasaus ennen julkaisua (tarkistettu: uudet ja korjatut tekstit ovat ≤ 150 / ≥ 70 muutamaa poikkeusta lukuun ottamatta).
- Yhden lähteen varassa mutta attribuoidut: Van Goghin lampun hehku (kirje 499), Lutman hopeamalja, SK-C-374 vihertävä kasvo, SK-A-45 takka (Wikipedia + sisarteos), mauritshuis-146/Hals CODART-väite. Mauritshuis-, NGA- ja Orsay-sivut 403 → hakutiivistelmät.
- Koordinaatit tarkistettu Commons-kuvista; jos pelin kuva on rajattu eri tavalla, paikat katsottava uudelleen.
