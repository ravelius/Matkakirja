# Natiivi-UI: luovutus 10.11.2026 klo 16.18 (kontekstivahti 26 %; korvaa -1412:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a.
Natiivin haarat natiivi-backup-remotessa; worktreet alla. Unity-tarkistus: `sh Peli-testit/unity-tarkistus.sh` worktreessa.
Edellinen (historia): `git show b7cf30714:docs/raportit/viesti-natiivi-ui-luovutus-20261110-1412.md`.

## 1. KAUPUNGIN NIMEN NAPAUTUS ZOOMAA (omistaja 10.34) — MR PIDOSSA, ODOTTAA PT/KK
- fb16ab5de natiivi-ui/kaupunkinimi-zoomaus (wt /Users/Shared/Claude/wt/proto-nui-nimizoom). Iso iPad -ehto EI täyttynyt (16.05):
  Marseille 1,7 km:ssä tyhjää paperia myös +20 s (lokit/nui-kaupunkinimi-zoomaus-2-ipad-fb16ab5de-u m-1/m-2; pallo jäi 57,9 %:iin,
  elävä kartta piirretty 0). Lyon "tuntematon kaupunki" (Ranskassa pelissä vain pariisi ja marseille). KK:lle + PT:lle + JU:lle sanottu: ei MR:ää.
- PT 16.1x pyysi kokeen: piirroksettomassa katto. Tehty ef774d9fd (sama haara; `peli nimizoom-katto <kaari|pois>`, oletus 1°).
  Mac-ajo lokit/nui-kaupunkinimi-zoomaus-3-mac-ef774d9fd katsottu: Barcelona ILMAN kattoa näyttää katuverkon (b-0) → tyhjä pohja on
  Marseillen oma laattojen aukko. Katto heikentää Barcelonaa (b-1), Marseille 0,25° (m-3) hyvä. VIKA: Pariisi sai katon Macilla
  (PiirrosKerros.Keskusta null, kun karikatyyri pois) → jos katto jää, ehto ei saa olla "ei piirrosta".
- 16.5x PT:lle: suositus Marseillen laattojen korjaus NS:lle, ei kattoa. KK:lle: suositus 1 (kortti piirroksettomissa) rajaisi turhaan
  toimivat kaupungit; parempi zoomaus kaikkiin + Marseille erikseen. KK vie kortin omistajalle (16.4x sanoi suositus 1:llä; tarkennus jonossa).
- Tee: odota PT:n/KK:n linjaus. Jos "zoomaus kaikkiin, katto pois": peruuta ef774d9fd (git revert) tai oletus 0, ja MR fb16ab5de-linjalla
  JU:lle vasta, kun Marseille korjattu tai omistaja hyväksyy. Työlistan rivi "Kaupungin nimen napautus zoomaa kaupunkiin" (NUI, työn alla).

## 2. KUVAKYLTTI-KOE: TEKSTIT VÄISTÄVÄT 3D-TÄHTEÄ (KK 16.4x) — MAC-AJO JU:LLA
- KK:n linjaus: 3D-tähti ei siirry. (1) kuvakyltti tähden alle, ettei kuva/kyltti peitä tähteä; (2) saman paikan karttanimi piiloon
  ("Temple", "Place de la Bastille"); (3) muut tähden/kyltin päälle osuvat nimet sivuun tai piiloon. Omistaja 09.49: ei mitään tähden päälle.
- 753093617 natiivi-ui/kuvakyltti-tahdet (wt /Users/Shared/Claude/wt/proto-nui-tauko) = dce3d6ae0 + PiirrosKerros.Tahti3DRuutu (piirretyn
  tähden ruutulaatikko) + NostotKartalla: KuvakyltitTahtienAlle (KuvakylttiAlas), Kohdelaatikot varaa 3D-tähden ja medaljongin.
  `ui kohdenostot` näyttää "3d-tähti (x,y)–(x,y)" ja "kuvakyltti alas N". Vain kuvakyltti 1 (oletus pois); ei junaan ilman korttia.
- JU: sk /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-kuvakyltti-3-mac.txt → lokit/nui-kuvakyltti-3-mac-753093617.
  Pari: ENNEN lokit/nui-kuvakyltti-2-mac-dce3d6ae0 1b/2b/3b | JÄLKEEN 1b/2b/3b (sama rajaus, täysikoko) → PT.
- Jos "Temple"/"Place de la Bastille" yhä näkyvät: elävät nimet ladotaan Nimikerros.LisaaElavat → NimiLadonta.Lado varauksilla
  (KaupunkiMerkit.Kalusteet ← UiNakymat.KartanKalusteet ← Kohdelaatikot); tarkista `nimet laske` ja onko nimi Pakko (ValitsePerintoSivut).

## JONO
Kohtien 1 ja 2 jälkeen: rivi PT:lle "JONO TYHJÄ: natiivi-ui" (`python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py
--kansio /Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo seuraava NUI`; nyt NYT nimizoom, seuraava kuvakyltti-koe).
- JU 14.33: linkki 224.26 = 6087868bf (välilehtivärit); museon latausilmaisin MR18 → 224.28 (ei NUI-toimia).

## LISÄYS 16.2x: KK → NUI, OMISTAJA 16.14 nimen napautuksen korttiin
"eikö kaikissa kaupungeissa pitäisi olla kuitenkin striimikartta käytössä?" → KK: oikeassa (2.11. 22.08, Raamattu 2.204). Kortin kaksi
vaihtoehtoa RAUKEAVAT; katto-koe ef774d9fd turha (revert tai oletus 0 ennen MR:ää). Marseillen tyhjä paperi = VIKA: miksi striimikartta
ei näy (ei kytketty, ei lataudu vai hidas verkko)? Selvitys PT:n jaon mukaan (NUI:n ehdotus PT:lle 16.5x: NS). fb16ab5de junaan vasta,
kun Marseille + toinen kaupunki näyttävät striimikartan isolla iPadilla. Vihjeet: iPad-ajon konsolissa pallo 57,9 % koko 20 s ja
"elävä kartta … yhteensä piirretty 0" koko ajon; Barcelona (Mac) näytti katuverkon, Marseille (Mac ja iPad) ei.
