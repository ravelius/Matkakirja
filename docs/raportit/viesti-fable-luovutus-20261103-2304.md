# PT:n luovutus 3.11.2026 klo 23.04 (konteksti 30 %, pehmeä raja)

Edellinen: viesti-fable-luovutus-20261103-2215.md. Id:t osoitekirjasta. Taulu kuten edellä.
Vahdit Monitorilla 30 min: python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py | grep ODOTTAA|TYHJÄKÄYNTI|TILA\|.+ ja /Users/Shared/Claude/hooks/codex-posti-vahti.sh.
YÖTILA: omistaja nukkuu, KK hyväksyy puolesta (22.30; rajat: ei TF, ei junan lukitusta, ei ostoja, ei asetuksia, ei yli 3 % generointia). Kuvat PT:n kautta KK:lle.

## TAVOITE AAMUKSI (omistaja 22.31 "Koita saada Pariisin kartta tehtyä kokonaan")
Ohje: scratchpad/keskustelukanava/suunnitelmat/20261103-pariisi-ylaviisto-ja-osakirjasto.md, osio YÖ 3.–4.11. Pariisi ei ole vielä valmis.

### Nähtävyydet (KK 22.4x: vain G:n päänähtävyydet; HdV, TSJ, Oikeuspalatsi EI, peruttu 026cef3ca, ei ottoja)
- HYVÄKSYTTY: ND (laiva kokonaan; sijoitus 993075f27), Louvre 0,91, Eiffel, Riemukaari, Sacré-Cœur, Opéra.
- Peliin: 9528c1d53 (Eiffel, Riemukaari, Louvre v2 + VS 43df66241) on KOEAJO: "k11 koe", EI junaan eikä ämpäriin ennen KK:ta; Kartta-testit ajamatta. Sacré-Cœur ja Opéra NS:lle pyydetty.
- Codex: Invalides e1f0bd915 ja Grand Palais 62106010f toimitettu, KS tuo parit. Tulossa Panthéon, Montparnasse, silta-arkki; Sainte-Chapelle pyydetty KS:ltä.
- ND-korjaukset (KK): NS: Oikeuspalatsin kuva pois, vene pois sillalta, raivaussädekehä pois. KS: nimet pienemmiksi ja harvemmiksi, valkoinen hitunen tornin ja huipun välissä.

### Korttelipinta = SUURIN RISKI
KK palautti k10:n: katot harmaansinisiksi, L-läiskät pois, sauma pois, julkisivureuna + muste, harmaat kiekot. VS:n k11 peruttu, seuraava k5:n päälle. VS 23.0x: L-läiskät osittain, julkisivureuna ei aloitettu, kiekot ratkaisematta (oletus NS:n aukioesineet). Täyttö koko Pariisiin vasta KK:n hyväksynnän jälkeen.
Sauma: NUI:n mukaan esikatselun harha, MUTTA sauma-a.png on tasainen vektorikartta ilman A2-pintaa; todistus koskee vain pohjaa. Ratkeaa iPad-kuvasta 9528c1d53:lla samalla kameralla (pyydetty JU:lta ja NUI:lta).

## Muut auki
1. JU: laiteajot EIVÄT päteviä: fb7ff2595 päävalikkoa, 4397cf20d-savu: matka pariisi VIRHE, sali-ys Lontoon kartta. Uusinnat kesken; seuraava junakierros (mm. jalki v3 9d02ae999) odottaa. Avaa kuva ja vertaa lokin aikaa ennen kuittausta.
2. PK: otsikkokorjaukset haaralle otsikko-219 (7611ad84b + KK:n lista, luovutus 832b43ee2); alkulento ei lopullinen junassa 218, TF vasta korjauksen jälkeen. Latauskuva vaaka hyväksytty, nimi VIIMEINEN KEISARI oikein. Vesi c865ea4d8 ja palvelijat v6 vuorolla Pariisin jälkeen.
3. LAV: tausta-v123 bdff62d48809: kolmio ja poikkiraita korjattu, pari KK:lle kuvien jälkeen (KK pyysi). Seinät ja taivas luovutuksessa.
4. Levy 67 Gi (raja 100): Postivahti ilmoittaa alle 40 Gi:ssä. CoreDevice 18 Gi aamulla omistajalle (KK:n listalla). wt 108 Gi: PT lupasi siivota mergetyt, EI tehty. Mittaamatta noin 500 Gi Shared/Claude:n ulkopuolella (tili samireivinen?).
5. Nollaukset: Postivahti hoitaa JU ja VS; VS:n luovutuksia on kaksi (838397956, 2a2386d1e).
6. Alkuintro estetty kuten edellä.

## Opit
- Valmis-rivi vasta kuvat katsottuna: muisti valmis-rivi-vasta-kuvat-katsottuna.
- Jonossa oleva viesti voi jäädä lukematta nollauksessa; varmista tärkeät uudelta sessiolta. KK:lle ei viestejä sen nollautuessa.
- Tarkista tilaukset commitista: KS:n 10 tilausta lähti vanhalla listalla (korjaus oli vielä jonossa).
- Kellonaika date-komennosta myös viesteissä: arvioin aikoja liian myöhäisiksi.
