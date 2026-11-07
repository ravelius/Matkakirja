# Julkaisija: luovutus 7.11.2026 klo 07.50

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt. Korvaa aiemmat luovutukset, mutta OPIT ja YÖN SÄÄNNÖT luovutuksesta -0450 (haara julkaisija-luovutus-0450) ovat voimassa. Id:t: /Users/Shared/Claude/osoitekirja.md.

## ALOITA TÄSTÄ: TF 1.1 (219) sisäinen koeversio odottaa PK:ta; ei ajoja käynnissä
OMISTAJA PYYSI JULKAISUA 07.41, kortti 07.43, PT 07.45: sisäinen koeversio TF:ään, ei ulkoisille, ei lukitusta, ei Macille (kuten TF 218), ei mainiin. Kokonaisuutta ei ole ajettu iPadilla, omistaja tietää.
PT 07.48: ÄLÄ vie 36cd3087a:ta (julkaisija/tf-219-koe = c390b057f + e48424a75): siinä ei olisi taloja, koska palat ovat vain Macissa. PK tekee koodimuutoksen ja palat sovelluksen mukaan (+660 Mt) rungon päälle.
1. Anna PK:lle YKSI iPad-vuoro heti, kun se pyytää (laitekäännös: `PROTO_KEHITYS=1 LINJA=2 ASENNA=0 zsh T/laite-iso.zsh <sha>`; mallit T/pk-pallo-kaanna.zsh ja T/pk-pallo-ipad-ajo.zsh).
2. Vienti vasta PK:n iPad-ajon rivin "ASSETIT OK" jälkeen UUDESTA kärjestä.
3. Dispatch: `.github/workflows/proto3d-testflight.yml`, ref main, vie_unitysta true, proto_ref <koko sha>, versio tyhjä, build_numero 219, sisainen_ryhma true. TF 218 ajettiin vie_unitysta + proto_ref -tavalla (run 41970915733, Build/yo). Kaksi ajoa kaatui ennen sitä: tarkista lähtö heti. Kentät on päätelty lokista, ei komennosta; lue ohjeet ennen ajoa. Muutoslokin rivi 1.1 (219) on jo mainissa (PR 6433), teksti "Sisäinen koeversio Pariisin ja Lontoon kartan vertailuun. Ei muutoksia pelaajille."
4. Lukko /tmp/matkakirja-kaannospalvelu.lukko: L1 oltava vapaa. Käännöskopion Build/laattapaketti/laattapaketti.bin 35,5 Mt on paikallaan. +660 Mt: tarkista lisäysversiosääntö NS:ltä.
5. Jokainen vaihe tauluun (talo/eteneminen.json, nimi TÄSMÄLLEEN "Juna 219", hook hylkää muun) + tools/asemataulu/juna.py; kun TF on sisäisillä: rivi PT:lle ja KK:lle. Taulussa nyt "pysäytetty".
Avoin juna on tämän jälkeen 220: kerro PT:lle.

## LEVY
35 Gi vapaana. PT:n raja: alle 30 Gi ei TF-ajoa, rivi PT:lle. PT pyysi siirtoa T7:lle, yli 48 h vanhat: T/siirto-48h-20261107.py (--koe, --aja; käyttää tools/levy/siirra_t7.py:tä, jättää linkit; säilyttää 2cba21a3e, d092f48cc, a4269054a, 9a1e39ee5). Koe 07.47: lokit/ 0 Gi, koska 53 Gi on kaikki alle 48 h; _valmiit 0, _tyo 0,3 Gi. Ei ajettu, PT:lle kerrottu 07.47; rajaa ei lasketa ilman PT:n sanaa. PT:n 07.48 "lokien siirto jatkuu" lähti ristiin: varmista PT:ltä, jos levy kapenee. Ei siirretä: lokit/julkaisija-laite-218-2cba21a3e, KS 46, nui-louvre, pelikoodari-pallo.

## KUITATTU TÄLLÄ VUOROLLA
LAV vyo2, vyo3 (uusinta a1ad1999a), vyo4. PK z3, g1 (Lontoossa NRE 7379 kertaa, ilmoitettu), g2 (NRE 0), kohta10, pallo-ipad (3/3). KS 44, 45, 46 (82/82). NUI kyltti-malli-1..4; NUI louvre-kyltti-1, -2 ja louvre-mittaus (NUI ajoi itse). Jonot tyhjät, L1, L2, iPad vapaat, iPadilla runko d092f48c.

## OPIT TÄLTÄ VUOROLTA
- Skenaarion `kuva X` iPadilla (T/ipad-skenaario.zsh) lähettää peli-komento "ruutu" eikä tee tiedostoa X.png. Laitteella `komento kuva X` + odota 3, ja png haetaan Documentsista. Tarkista ennen laiteajoa.
- ipad-skenaario.zsh asentaa ja käynnistää heti (error 22 mahdollinen); T/ipad-skenaario-f1.zsh ei asenna. Mallissa T/pk-pallo-ipad-ajo.zsh on asennus + esikäynnistys + f1. Asennusrivi "? options:" on normaali tuloste.
- Älä luota tulosriviin "AJETTU/rc 0": aja-*.zsh:n vanha malli kirjasi käännösvirheen (vyo3 418ed689e) onnistumiseksi. Kuittaukseen kuvamäärä + aikaleimat + Exception-määrä. Normaali on Exception 11 ja yksi ArgumentOutOfRangeException; poikkeama avataan (g1 66464 = NRE, tulosrivi näytti VALMIS).
- "App terminated due to signal 15" konsolissa LOPUN jälkeen on oma lopetus; laskuri "kaatui 1" on silloin harhaanjohtava.
- Assettivahvistus paljasti, että skenaarion `talot kansio` -palat ovat vain Macissa: kokeet näyttivät taloja, joita TF:ssä ei olisi. Tarkista paikalliset kansiot ennen koerunkoa.
- Puhdas koeyhdistys ilman työpuuta: `git merge-tree --write-tree A B`, sitten commit-tree -p A -p B.
- Pääreposta ei voi luoda haaraa julkaisija/...: ref "julkaisija" on olemassa. Käytä julkaisija-...; protossa julkaisija/... toimii.
