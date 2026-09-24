# Linssisepän luovutus 24.9.2026 aamupäivä

*Linssiseppä (Opus) porttaa web-linssit natiiviin (Unity 6.3 + Cesium). Jatkaja lukee tämän, inventaarion
natiivi-linssit-inventaario-20260923.md (päivitetty 24.9.) ja regressioraportin
proto-3d/lokit/linssit-regressio-20260924/RAPORTTI.md. Edellinen luovutus: viesti-linssiseppa-luovutus-20260924.md.*

## Tila lyhyesti

**Kaikki 9 linssiä = web iPadilla** (master 3b0c253, regressiokierros 24.9.): topografia, vesistöt,
astronautin kamera, keksinnöt, ihmisen matka (myös tutkimusvaihe, muisti, tiedeliite), vertailu, maatiedot,
radio (▶-napit) ja isoisä 1873 erä 1. Hyväksytyt erot: pohjakartta (natiivi 23a-reliefi; webiin #2957),
vesistöjen yhtenäinen uoma (webin pallolla z-taistelubugi, Fable 24.9.).

## Sitovat säännöt

- Web on oletus; poikkeamat vain Fablen/omistajan luvalla, todisteena iPad-kuva webin rinnalla.
- Fablen käskyt ovat sitovia Raamatun sisällä. Viestit Fablelle: valmis erä, jumi tai kysymys, ≤ 8 riviä.
- iPad: pyydä Natiivisepältä ("iPad vapaa?"), vapauta aina ("iPad pois"). Testit ilman ääniä.

## Työkalut

- Proto-worktree /Users/Shared/Claude/wt/proto-linssiseppa; erä = `git checkout -B linssiseppa/<aihe> master`;
  merge-pyyntö Natiivisepälle yhdellä viestillä. Uudet .cs-tiedostot tarvitsevat .metan (Natiiviseppä).
- `Linssit-testit/kaanna.sh` (210/210), `Linssit-testit/unity-tarkistus.sh` (0 virhettä).
- Webin vertailukuvat: `node Linssit-testit/kontakti-web.mjs <kansio>` (aikajanat) ja
  `KIINTEA=topografia|vesistot|satelliitti|maat|radio` (Playwright, oikeat ajastimet, Lontoo, iPadin mitat).
- iPad: `KAUPUNKI=lontoo [RADIO=1] Linssit-testit/laitetesti.sh regressio <kansio>` (tai kontakti, maat,
  isoisa, tutkimus, radiokontakti erikseen). Tarkista kuvien päiväys (Documents sisältää vanhoja).
- Testikomento `ihminen tutkimus` (linssi-komento.txt): ihmisen matka suoraan tutkimusvaiheeseen.

## Tänään tehty (kaikki masterissa)

- Ihmisen matka: tutkimusvaihe (Tutkimusvaihe.cs), muisti (LinssiMuisti.cs, PlayerPrefs `matkakirja-linssimuisti-<id>`),
  nostojen korttikentät ja tiedeliite (ITiedeliitteenLahde), raidan väistö tiedeliitteen ajaksi, Esitys.Leimat.
- Keksinnöt: tummennus lineaarisessa tilassa (eksponentti 1,75), valojen hehku (_TummaPohja), reiän peilaus
  (GetNormalizedScreenSpaceUV Metalilla), paalun reikä, pelaajan X-toive, lamppujen napautus.
- Kaikki linssit: pistekerroin Round(dpi/163) kuten UI (iPad 2, ei 1,62).
- Radio: RadioLinssi.Napit + OmatNapit, LinssiOhjain.Ruutupiste (Natiivi-UI piirtää ▶-napit).
- Muiden korjaukset löydöksistäni: Natiivi-UI:n sininen sävykerros (mk-liike__savy), Natiivisepän
  FOV 50° ja MaaKartan 1 px reuna + täyttö, Siirtosepän maarajat (skeema 1.29) ja lahde-kentät (ETOPO 2022).

## Kesken / seuraavaksi

1. Keksintöjen reiän kulku hypyssä: EI TARVITA. Web ajaa siirraReikaMatkalla vain ajaValia-hypyssä, joka
   käynnistyy kaarille, joilla reitti tai hyppykamera; keksinnöillä ei kumpaakaan (tarkistettu 24.9.).
   Linssit ovat valmiit; seuraava tehtävä omistajan aamukokeilun löydöksistä (Fable).
2. Natiivi-UI: ihmisen matkan "Kertomus päättyi" -kortti ei ole webissä (ilmoitettu).
3. Isoisä 1873 erä 2 odottaa omistajaa (ei webissä, ei tehdä).
4. Webin vesistöjen z-taistelu on Pelikoodarin matalan prioriteetin bugi (Fable).
