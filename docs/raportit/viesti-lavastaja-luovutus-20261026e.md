# Lavastaja: luovutus 26.10.2026 klo 15.33 (kova raja 35 %; kaksi ajoa käynnissä luovutushetkellä)

Edellinen: `docs/raportit/viesti-lavastaja-luovutus-20261026d.md` (ea12af799 + lisäykset d238785b9). Haara `linnanrakentaja-tyo-20260929`.
Proto: `wt/proto-lavastaja-muoto`, haara **lavastaja/rakennukset-v48-211** (natiiviseppa/juna-211:n päällä, paikallinen):
79a7f3ad1 (RakennusKansio v48) → **437f03035** (AvoimetKansio v49). NS sai molemmat osoittimet JU:lta.

## Valmiit tänään (viety)

- **rakennukset-v48** (PT 15.0x kuittaus): `_valmiit/juoksupeli-kielletty-rakennukset-v48-vienti-20261026`, SHA256SUMS 9aefdaf29e71…
  (`tyokalut/pakkaa_rakennukset_v48.zsh`). JU vei 14.51, osoitin 79a7f3ad1.
- **avoimet-v49** (PK:n löydös, PT 15.4x kärkeen, 15.5x kuitattu): työhuoneen, puutarhan ja varaston palkisto_±2.7 hallin keskelle
  (z × 1,374 kuten juhlasalissa; `tyokalut/avoimet_palkisto_keskelle.py`, vain solmut). Pohja v48 (pylväät ø 0,28). Paketti
  `_valmiit/juoksupeli-avoimet-v49-vienti-20261026`, SHA256SUMS 7ed2e6c59799… (`tyokalut/pakkaa_avoimet_v49.zsh`). JU vei 15.30,
  osoitin 437f03035. Pari `kielletty-rakennukset/avoimet/palkistopari-v47-v49.png`. PT:n ovikysymys vastattu: ovilehti on pelin
  liikkuva ovi (osamallit), tyohuone.glb:n solmut v47 = v49 → ei v50:tä oven takia.

## KÄYNNISSÄ 1: salin leivonta → avoimet-v50

VS (15.3x): salissa ei sotkupintaa (P42: kaikki 04-kuvan leivotut y ≤ 2,95), materiaalinimiä ei muuteta; "v50 voi mennä pilotti 4:n
leivonnalla". **Pilotti 4 on kuitenkin v47:n juhlasalissa (pylvään jalusta 0,95 m)** → v48:n faktakorjaus (0,44 / ø 0,28) kumoutuisi.
Siksi `leivottu-sali/aja6.zsh` (käynnistetty 15.3x, nice 10): avoin_uv2.py v49:n juhlasalista → juhlasali-uv2d.glb, leivonta pilotti 4:n
asetuksin (KERROIN 2,0, NAYTTEET 4096, SUODATA_R 2, AZ 188, EL 45, taivas/maa kuten aja4) → `leivottu-sali/avoimet-v50/` (v49 + leivottu
juhlasali). Loki `leivottu-sali/leivonta-6.log`. Seuraavaksi: tarkista että juhlasali.glb:ssä on valo_rgbm ja pylväät 0,443 m → testijuuri
(kopioi `havainne-kuja40/juuri-v49av`, linkki avoimet-v47 → leivottu-sali/avoimet-v50) → file://-polku **VS:lle** (lupasi ajaa 04:n
kertoimilla 1,0 / 1,25 ja tarkistaa pylväiden kohinan) → VS:n luvut OK → pakkaa (pohja pakkaa_avoimet_v49.zsh) → PT pari → JU.

## KÄYNNISSÄ 2: valkoinen viiva → tausta-v57

Syy löydetty: pala 1-2, 25 m:n lattiaruudun lävistäjä x − z = −300 ((−150, 150) → (−125, 175)). Kulma (−125, 175) on toisella puolella
y 0,199 (korokkeen reuna), toisella 0,0 → kiilarako 0…0,2 m pitkin lävistäjää + T-liitokset (toisen puolen kärjet pitkän reunan sisällä).
Videon (todistus-elavyys-11c3a8202, t53.6 ≈ s 311, Puyi pohjassa ≈ (−129, 178) etelään) viiva kulkee juuri tätä linjaa; editorissa sama
sahalaitainen kirkas reuna Puyin oikealla (lokit/havainne-editori-20261026-145622, -150219, -150726: varjot 0 / leivonta 0 eivät muuttaneet
sitä; huom. kumpikaan komento ei näytä tulleen voimaan).
Korjaus `tyokalut/tausta_tliitokset.py` (v2; .v1 = vain ≤ 2 cm): maakolmiot, joiden reunalla on toisen maapinnan kärki (xz < 2 mm, korkeus
± 2 cm, saman materiaalin kesken ± 25 cm), jaetaan reunapisteistä + painopisteestä; attribuutit interpoloidaan (UV1/valo jatkuu). Kaikki 60
tiedostoa: 11 475 kolmiota jaettu → `kielletty-rakennukset/tliitokset-v57/kielletty-tausta-v57/`. Testijuuri `havainne-kuja40/juuri-v57`
(tausta-v48…v56-linkit → v57). Lävistäjä tarkistettu laskennallisesti puhtaaksi (scratchpadin tliitos.py).
**Vertailupari käynnissä**: `havainne-kuja40/pari-viiva.zsh` (juuri-v48 | juuri-v57, kohta 06 −129,4 168 178) → lokit ajo-viiva-juuri-v48.log
ja ajo-viiva-juuri-v57.log (PORTTI VALMIS <kansio>/06.png). Arvioi: sahalaitainen kirkas lävistäjä oikealla alhaalla poissa v57:ssä, eikä
valaistus muutu (ensimmäisessä v1-ajossa 15.16 valaistus muuttui – se ajo oli MALLIT ilman file://-etuliitettä, tyhjä maailma; 15.25 ajo
file://:llä näytti valaistuksen muuttuneen → siksi kontrolli juuri-v48 samalla file://-tavalla). Jos OK: pakkaa tausta-v57 (pohja
pakkaa_v56_v47_v16.zsh, vain tausta; LAHTEET: T-liitokset), pari PT:lle, osoitin TaustaKansio v56 → v57 437f03035:n päälle.
Jos valaistus muuttuu v57:ssä: vertaa valo_rgbm/TEXCOORD_1 (valokartta.py) v56 vs v57, epäile glb-uudelleenpakkausta.

## Syyt ja opit

- **MALLIT vaatii file://-etuliitteen** (`MALLIT=file://<juuri>/`); ilman sitä palatsi ei lataudu (pelkkä maa ja taivas).
- Pelin koordinaatit lokeissa (puomiloki, lähimallit) ≠ pohja: kierto −2,0335° Meridiaaniportin (13,186, −380,906) ympäri,
  Ox 16,37, Oz −387,0: rx = Ox − gx, rz = Oz − gz → pohja = käänteiskierto (JuoksuPalatsi.Pohjaan). Videon aika = konsolin "aika"
  (rikkomisreaktio "aika 54.0 s 314.0").
- Pelin aurinko editorissa 45°/215°, varjokartta 1024², 2 kaskadia (esikatselun ajo.log "valopohja").
- portti-lr.sh ei ole suoritettava → `zsh ./portti-lr.sh`; LISA="ui …" lisää komentoja ennen kuvaa.

## Jonossa

1. v50 (yllä) ja tausta-v57 (yllä).
2. Salin pakettinimi on avoimet-v50 (ei v49, joka meni palkistolle).

## Työkalut (uudet, `kielletty-rakennukset/tyokalut/`)

pakkaa_rakennukset_v48.zsh, avoimet_palkisto_keskelle.py, pakkaa_avoimet_v49.zsh, tausta_tliitokset.py (+ .v1); `leivottu-sali/aja6.zsh`;
`havainne-kuja40/pari-palkisto.zsh`, `pari-viiva.zsh`, juuri-v49av, juuri-v57. Analyysiskriptit (maarako, varjo, valokartta, tliitos) olivat
session scratchpadissa – tliitos.py:n logiikka on tausta_tliitokset.py:ssä.

## Lisäys 15.3x: vertailupari valmis (ÄLÄ PAKKAA VIELÄ)

`kielletty-rakennukset/tliitokset-v57/viivapari-v56-v57.png` (lokit/havainne-editori-20261026-152923 = v56, -153129 = v57):
sahalaitainen kirkas lävistäjä oikealla alhaalla **poissa v57:ssä** ✓, MUTTA v57:ssä uusi tumma suorareunainen laikku oikealla
(kuvan oikea reuna, Puyin oikealla edessä) jaettujen kolmioiden kohdalla. Epäilyt: (1) jaetut kolmiot taitetaan T-kärjen korkeudelle
(saman materiaalin ±25 cm) → kaltevuus/normaali muuttuu ja reaaliaikainen varjo tai valaistus eroaa; (2) UV1-interpolointi osuu
leivonnan reunatekseleihin (palan reuna-arvot 0,2–0,5 vs sisä 1,1). Kokeile ensin v1-tilaa (vain ±2 cm, `tausta_tliitokset.py.v1`)
ja vertaa; tai jätä kiilaraon kolmiot jakamatta mutta laske pitkän reunan kärki (−125, 175) y 0,199 → 0 (lattia korokkeen alla).
Pakkaa vasta, kun pari on puhdas molempiin suuntiin.

## Lisäys 15.4x: PT – tausta-v57 vain yhdessä VS:n uudelleenleivonnan kanssa

PT 15.4x (VS P43): porttihallin seinien kiilat ja kattojen sotku ovat v56-taustan leivottua valoa, todennäköisesti poistetun geometrian
varjoja. **Älä pakkaa tausta-v57:ää ennen kuin olet sopinut VS:n kanssa uudelleenleivonnasta samaan pakettiin (yksi v57).** Järjestys:
T-liitoskorjaus (ja tumman laikun ratkaisu) geometriaan → leivonta nykyisillä varjostajilla VS:n sopimin asetuksin (pohja
aja_tausta_v46_leivonta.zsh / leivo_valo.py) → pari → pakkaus. Uudelleenleivonta ratkaisee todennäköisesti myös tumman laikun (UV1/valo).

## Lisäys 15.36: v50-leivonta valmis

`leivottu-sali/avoimet-v50/` valmis (juhlasali.glb: valo_rgbm, pylväs 0,443 m, palkisto kuten v49; VALO max 1,80, mediaani 0,12).
Testijuuri `havainne-kuja40/juuri-v50` (avoimet-v47-linkki → avoimet-v50). VS:lle lähetetty file://-polku: VS ajaa 04:n kertoimilla
1,0 / 1,25 ja tarkistaa pylväiden kohinan → VS:n luvut OK → pakkaa avoimet-v50 (pohja pakkaa_avoimet_v49.zsh) → PT pari → JU →
osoitin AvoimetKansio v49 → v50 437f03035:n päälle. VS:lle myös pyydetty P43-asetukset tausta-v57:n uudelleenleivontaan.
