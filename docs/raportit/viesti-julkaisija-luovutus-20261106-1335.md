# Julkaisija: luovutus 6.11.2026 klo 13.35

Rooli: Julkaisija (JU). Korvaa -1244:n ALOITA-osan ja TILAN. Voimassa: -1244:n VIRHEET JA OPIT (haara julkaisija-luovutus-1244), -1136:n PT:N SITOVAT ja opit, -1008:n opit ja b8-VAIHTO, -0855:n, -0651:n, -0041:n ja -2347:n opit, -2152:n ja -1906:n TAPA, -1812:n SITOVAT LINJAT. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

Syy: konteksti 30 %, jonot tyhjät.

## ALOITA TÄSTÄ
1. Tarkista `ps`, lukot ja jonolokin loppu. 13.34: ei ajoja, ei lukkoja, L1 ja L2 vapaat, iPad vapaa. Monitorit eivät selviä nollauksesta; tällä hetkellä niitä ei tarvita.
2. Tulossa: NS:n iPad-ajo uudella radalla r4, erillisenä pyyntönä Mac-6:n kuvien jälkeen. Ei r3:a iPadilla (omistaja 13.07). NUI saattaa pyytää pysty x3:a uudella kärjellä. PT käsittelee taivaan vaakaraidat VS:n kanssa.
3. PT 13.3x: museokyltit todennetaan seuraavassa rungon laiteajossa käynnillä museossa, ennen junaa; ei omaa ajoa nyt. ND-nimi NUI:lla, taivaan raidat VS:llä; kansio ja soikio suljettu. Oikea runko jää iPadille.
4. valoseppa-vahti pid 90769 saa pyöriä: taukolippu T/valovahti-tauko estää kääntämisen (PT 13.0x).

## TILA
- Junarunko julkaisija/runko-219-muisti = 84872eaa9. Ensimmäinen b8-laitekäännös tehty (lokit/julkaisija-laite-218-84872eaa9, koottu 13.23). PT kuittasi: b8 toimii laitteella.
- Iso iPad: 84872eaa9 asennettu 13.31, sovellus suljettu. Kuvat lokit/julkaisija-runko-ipad-84872eaa9 (5/5, Shader error 0, poikkeuksia 0). Muisti- ja verkkomittaus erikseen myöhemmin.
- L1 = esikatselu b7 (LAV:n ja VS:n b7-vertailut) ja UI-ajot. L2 = esikatselu-2 b8. b7-koodi (esim. 35140432d, b0f94ac0a) kuuluu L1:lle. Levy 67 Gi.
- P/esikatselu-2-Library-b7 ennallaan: ei poistoa ilman yösiivousta tai omistajan sanaa.

## TULOKSET TÄSSÄ VUOROSSA (viety tekijöille)
- LAV: friisi2, pari3 b0f94ac0a (korvasi pari2:n, joka ei alkanut), pisteet1 (12 kuvaa), vrt125, levy1: kaikki exit 0, Shader error 0; 404: samat 4 tiedostoa.
- KS 14, 15, 16: AJETTU, Shader error 0.
- NS iPad 2 e1b50940b: "r3, ei lopullinen". Mac-6 fe117905d: 8 kuvaa, 7 csv, jsonl, Shader error 0, veto estetty 0.
- NUI 93bfd4379 (viat 4, 4, 1, 1, 3), 6b2566586 (CS0136), 1af361f4c (5), d4bd6969b x3 (3, 3, 3 samat), 87b01563a (3 samat).
- Rungon tarkistus PT:lle: ND:n ja Louvren 3D (OhjelmaKohteet*.cs, NotreDameKirkko.shader) vain KS:n haarassa, joten litteys kuuluu runkoon. Rungon koodissa ei viittausta kartta-osat-kansioon eikä OsaKansio-nimeä; muistitieto 4.11. ei päde tähän runkoon. Soikio todennäköisesti vene (pariisi.json liikkujat), kuvaa ei verrattu. Museokyltit ovat museolinssissä (MuseoRakennus.cs), eivät kartalla; ei todennettu. ND-nimen puuttumisen syy auki.

## VIRHEET JA OPIT
- Väitin soikiota 3D-kohteeksi ja arvasin paikan Pont au Changeksi ennen lähteen katsomista: PT palautti. Kuvahavainto ensin lähteestä tai merkitse arvaukseksi.
- Laitteella kuvat: `laheta komento.txt "kuva X"` ja `hae X.png`, malli T/runko-84872-ipad-ajo.zsh. ui-komento lähetetään "ui "-etuliitteen kanssa.
- L1:n lukko ei ole jono: friisi2 hävisi NUI:n varausten välit ja jonotti 10 min. Kun PT:n ajo kiirehtii, ketjuta se NUI:n väliin tai etukäteen.
- b7-koodi b8-Libraryyn olisi vaatinut vaihdon tai koko tuonnin; tämä on päätelty, ei kokeiltu. Siksi pari3 ei mennyt L2:lle PT:n pyynnöstä huolimatta (PT:n ehto "jos ei häiritse").
- zsh: `git=...; $G grep` ei toimi, muuttuja ei hajoa sanoiksi. Epäonnistunut glob kaataa koko komentorivin.
- Viesti-id:t lyhennettyinä eivät kelpaa: NUI local_a3754ed8-f155-43b5-9095-b51e9e29ff53, täysi id osoitekirjasta.
