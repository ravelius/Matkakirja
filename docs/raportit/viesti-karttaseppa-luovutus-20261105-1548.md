# Karttaseppä: luovutus 5.11.2026 klo 15.48 (KS)
Syy: konteksti 30 % (7.37). **Lue tämä, sitten -1509 (karttaseppa/luovutus-20261105-1509) ja -1452.** Tämä voittaa ristiriidassa. Python: /opt/homebrew/opt/python@3.14/bin/python3. Proto-worktree W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 44e65c788. Postin worktree /Users/Shared/Claude/wt/karttaseppa-postilaatikko (irrotettu HEAD, `git push origin HEAD:claude/postilaatikko`).

## LISÄYS 15.50: ajo e88559857 valmistui ja on katsottu (KK:lla oikaisun kanssa)
Toimii: Temple kuvana ★-kyltin vieressä, kyltit paikoillaan. Katsoin keskin, Templen ja Versaillesin, en vielä Châtelet'n, Bastiljin, Galerien ja Tuileries'n lähikuvia (kuvattu samassa kansiossa).
**Ensimmäinen työ: Peilisalin torni ei lähtenyt** (kyltit-versailles.png). Syy varmistamatta. Epäily: `PariisiKylteilla` vaatii `Kohdenostot.Kaupunki == "pariisi"`, ja kartta voi olla jo nollattu Versaillesissa; katso `Kohdenostot.cs` rivi 377 ympäristöineen ja lokista `MATKAKIRJA kohdenostot`. Vaihtoehto: `ladottu`-paikka (50,175) `OmaLat`:ssa. Korjaus saa koskea vain, kun kamera on Pariisin alueella; Ranskan tasolla merkit jäävät (muut kaupungit ennallaan).
Muuta auki: aarteiden kuvat keskitasolla noin 12 px / 2000 px (KK kertoo omistajalle, ratkaisu hänen sanallaan); Vrain-Lucasin napautus: `kohdenostot: ei merkkiä Vrain-Lucas` (skriptiin lisätty Les Hallesin napautus, kuva kyltit-napautus-halles, joten kuvia on 16); pyöreät kuvat ilman kylttiä: kysytty NUI:lta. Viestejä KK:lle meni jonoon: tarkista, onko KK lukenut.

## ENSIN
1. Remote päälle. Vahti Monitorilla (30 min, uusi päättyessä): `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh c76311691` (tila skriptin vieressä).
2. Odotetaan kolmea:
   - **Mac JU:lta:** 44e65c788, sk-pariisi-kyltit.txt, tulos `lokit/julkaisija-pariisi-kyltit-44e65c788` (JU:lle pyydetty 15.47). e88559857 on jo ajettu, katso LISÄYS **Katso kuvat täysikokoisina, sitten KK:lle ja kopio PT:lle (2.214).** Älä ilmoita, ennen kuin olet katsonut.
   - **KK:n sana Eiffelin otto 3:sta:** suositus lähetetty (etelä ja viistot uudelleen). Tripo ja muut seitsemän odottavat.
   - **NUI:n yhdistys:** e88559857 on NUI:n haarassa; 44e65c788 pyydetty pikakelauksella.

## Mitä kuvista katsotaan (omistajan sanat)
- 14.57: "kadonneet aarteet voisi näkyä myös kuvina mutta kuvan vieressä voisi olla erilainen kyltti jossa tähti". Kuvat kyltit-temple, -chatelet, -bastilji, -galerie, -tuileries: leike näkyy, ★-kyltti vieressä, ei isoa tähteä. Leikkeen koko on kartan mittakaavassa, eli voi olla pieni: jos näyttää pieneltä, rivi KK:lle.
- 14.55: "mitään pieniä malleja ei saa jäädä." Kuva kyltit-versailles: Peilisalin tornikuva poissa.
- Napautus: kyltit-ennen-napautusta ja kyltit-napautus eroavat, ja nostoruutu aukeaa. Ajossa 8d0cf457e ne olivat samat (kyltti ei ollut ruudulla).
- 14.40 + KK: "tuo kuva, kun malli näkyy pelin Pariisissa (Macilta, Louvre kokonaan)". Kuvat kyltit-louvre-ylhaalta, -viisto, -lansi. Kokemus: "lännestä katsoen pyramidin takaa nousee korkea keskipaviljonki, ja Louvre tunnistuu heti." suunta 90 oli arvaus: jos kuva on väärältä puolelta, korjaa skripti. Tarkista kirkkaus (Savy 1,26/1,33/1,15 on v1b:ltä), musta ja pohja (louvre-pohja sama koko 860 × 360, ei tarkistettu uudella mallilla).
- Linnut: pyysin KK:ta kysymään omistajalta kuvan yhteydessä. Muistuta.

## Tehty 15.10–15.48, ei vielä nähty pelissä, kääntämättä
- **e88559857:** `Kohdenostot.LeikeKuva`: viisi Codexin 2.11. leikettä Resources/Kohdenostot/leikkeet-pariisi/ (ratkaisu "leike"); `HaeVahvistettu` lataa ne suoraan. Kuvat ovat paketissa, eivät ämpärissä: ennen junaa versioituun kansioon, jos omistaja hyväksyy. `OnPariisissa` ulottuu Versailles'hin (vain Peilisali, Saint-Cloud, Kaulanauhajuttu lisää).
- **44e65c788:** Louvre 21h otto 4 korvaa v1b:n: louvre.bytes = GLB 3ed4f5fa sellaisenaan, louvre-normaali.bytes = mallin png-normaalikartta (1,4 Mt, v1b:llä 125 kt, voi vaatia pakkauksen). 46 673 kolmiota, koska kevennys rikkoi UV:t. Pyramidit ovat mallissa, ylhäältä hieman suorakulmaisia (154 × 117; koodin Pyramidit-arvoa ei käytetty; omistajan suhde 0,63 pihan leveydestä: mallissa 0,51–0,68). Jos KK tai omistaja haluaa koodipyramidit: PihaPois + Pyramidit, mutta silloin pihaan voi tulla reikä (tarkista).

## Eiffel otto 2 (KK:lla)
Kuvat `_tyo/codex/pariisi-sarja-20261105/_review-sarja-24b/eiffel/`. Omat mittaukseni: pohjoinen, itä, länsi leveys 37 % (oikea 38 %), etelä 50 %. Viistot liian matalalta (Codexin arvio 46° ja 58°, pyydetty 65°), koillisessa aukko 1. tasanteessa, lounaassa ei. Väri vaihtelee. Otto 3 vain KK:n sanalla; KK:n ehto 15.07: omistajalle ennen kolmatta.

## Auki
Pyramidi-merkki (museon napautus uudesta Louvresta) -1509:n mukaan: uusi Louvre on nyt kokeessa, joten seuraava askel on napautus, kun KK on nähnyt kuvan. Sarja 24:n asennus -1407:n ohjeella.

## Opit
- Tuo "leike" oli piirroskerroksen kuva: kun kerros on pois, ratkaisu "leike" ei tuo kuvaa, ja kolmella kohteella ei ole kohdekartan piirrosta. Katso, mistä kuva oikeasti tulee, ennen kuin sanot "kuvat jäävät".
- JU:n Mac-ajo vanhasta sha:sta ilman NUI:n d2d97e163:a kasaa kyltit vasempaan yläkulmaan. Tarkista ajon kärki.
- Uusi peli: kamera palaa maan näkymään noin 50 s; odota 60 ennen ensimmäistä aja-komentoa.
- GLB:n kuvat: normaali = `materials[0].normalTexture`, ei aina jpeg.
