# Valosepän luovutus 31.10.2026 klo 23.48

Syy: konteksti 27 % (pehmeä raja, PT 23.4x: "kirjoita luovutus"). Uusi tili (tilinvaihto 31.10. illalla). Loki:
`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 22.45–23.4x). Tulokset ja taulukko: `_tyo/linssiseppa2/k06k-tulos.md`.
Edellinen: viesti-valoseppa-luovutus-20261031-2210.md (työtavat voimassa). Proto-repo on vain paikallinen.

## VETOVASTUU: KOEKOHTAUS PIHA 06 (omistaja 18.28 / 18.31: "visuaalisesti mahdollisimman hieno")
### Valmista
- **k06k/k25** (ulkorengas-v10): sauma poissa → PT hyväksyi 22.4x.
- **Valoarvot o2/o3** (k06o): `valo k17 1 0.5 30 16 1.2` (ev 0,5, kylläisyys +30, kontrasti +16, ambientti ×1,2) + `sumu 0`:
  p5 60–64 (havainne 58), kylläisyys 0,32–0,33 (0,34), taivas 140/178/222 (145/193/251). PT ja KK kuittasivat suunnaksi.
  **Rajaus = o3** (z −492,3; o2:n −478 räystäät 0,14 vs 0,27). Sivuhallit/varjo-osuus 3,4 vs 12,2 % = sommittelu (oikeat mitat), EI VS:n.
- **Koodi:** proto `linssiseppa2/k17-piha06-216` = **ea732b7d3** (natiiviseppa/juna-216 ca536d93e:n päällä, worktree
  `/Users/Shared/Claude/wt/proto-linssiseppa2-k17`): ValoKohteet JuoksuK17 ev 0,5 / ambient 1,2 / sat 30 / kontr 16.
  **EI runkoon ennen PT:n erillistä lupaa** (PT 23.3x: reitti VS → PT → KK). Sumu 0 = koe 6.7:n asia (natiiviseppa/koe67-piha06,
  oletus SumuTiheys 0,006) → NS:lle, kun koe 6.7 menee runkoon.

### KÄYNNISSÄ
- **k06p2** (`skriptit-20261031/pari-k06p2.out`, lokit/pari-k06p2-*): rungon ea732b7d3 ilman koe 6.7:ää, p0 = vanhat k17 komennolla,
  p1 = uudet oletukset. Tarkista, ettei p1 ole liian tumma tai puhki ilman SSR/GI:tä (ambientti 2,3 → 1,2 koskee KAIKKIA juoksupelin
  kohtauksia). Tulos rivinä PT:lle (ennen runkolupaa). k06p kaatui: rungossa ei ole `valo gi|sumu|ssr|kiilto` (tuntematon = ajo kaatuu).

### AVOIMET ENNEN OMISTAJAA (PT 23.4x)
1. **Muurin punainen 0,48 → 0,61** (muuri 123/58/49 vs havainne 147/58/53). LAV:n V4_red k06c (0,2436/…) ja k06d (0,365/0,0111/0,0088)
   EIVÄT muuttaneet muuria (k06o o3 = k06q q0) → muuria ei piirrä V4_red. mika (k06m, unity.log esikatselu-20261031-225207 rivi 16983):
   säteellä `a-meridiaaniportti lod0 runko+palkit` (Maailma/Lattia, ei LAV:n paketissa) ja ulkorengas 2-2/3-2. Selvitä LAV:n kanssa,
   mikä materiaali porttiseinässä on (meridiaaniportin oma?), ja korjaa se lähteessä. Ei uutta kerrointa (PT: ei väliaikaisia).
2. **Pilvet terävämmiksi** (vasen ylä sumeita): STP `valo terava 0/0.6/1` ei vaikuta (reunaterävyys 760 vs havainne 1509) →
   panoraama itse pehmeä. Seuraavaksi `ui juoksupeli valo paivataivas 0` (proseduraalinen; vaikuttaa vasta seuraavasta juoksusta →
   asetuslohkoon ennen `oleta 240 palatsi`), tai Codexilta terävämpi panoraama (7.15).
3. **Taivaan sininen** B 222 → 251: samaan erään taivasarvolla, jos p5 ja muuri eivät muutu; muuten kirjaus.
→ Uusi o3-pari (juuri-k06e tai uudempi) + värimittaus → PT → KK.

## Työtavat (opitut)
- Skenaario: kopioi viimeisin `skriptit-20261031/pari-k06q.zsh` uudeksi (älä muokkaa ajossa olevaa); VAR = "paikka|testikamera|komennot".
- **`valo savy` aina viimeiseksi**: `sumu` sen jälkeen nollaa savyn (k06l). `savy palatsikatto` ei ole suhteellinen (ylikylläinen) → ei käytetä.
- Värimittaus: `python3 _tyo/linssiseppa2/tyokalut/varimittaus.py kuva ulos nimi:x0,y0,x1,y1` (ilman -I: numpy); laatikot riippuvat paikasta
  (o3: muuri 869,362,1303,420, lattia 145,898,440,1014). JuoksuUsva alkaa K7:ssä 320 m:stä → ei osu pihaan.
- Juuret: juuri-k06c (k06b + ulkorengas-v10), juuri-k06d (LAV k06c), juuri-k06e (LAV k06d); linkkien nimet vanhoja (rakennukset-v85, tausta-v81,
  muurikate-v29, osasarja-v6-k06, ulkorengas-v9) → vain kohteet vaihtuvat.

## Osoitteet (osoitekirja, uusi tili)
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, LAV local_16f6f272-61c6-43cf-8ad2-1f6020bb8bfd, NS local_99130238-aa54-4a29-bcc9-7a023584944b,
PK local_91a1bc27-6870-46aa-9886-66fd33b68880, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b.
