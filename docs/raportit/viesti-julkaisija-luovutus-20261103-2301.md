# Julkaisija: luovutus 3.11.2026 klo 23.01 (Macin kello) – konteksti 27 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261103-2135.md (24e1c2993, PR 6221).
Jonoloki: julkaisija-tyokalut/jono-20261103-ilta.txt (viimeiset rivit = nykytila). Ketjut nohup, kirjoittavat <nimi>.pid (TAPPO VAIN NIILLÄ).

## !!! OPIT TÄLTÄ VUOROLTA
- VALMIS-RIVI VASTA, KUN KUVAT ON KATSOTTU JA LOKIEN AIKA ON TUORE. Ilmoitin koealueen fb7ff2595 valmiiksi kuvia katsomatta: kuvat olivat
  päävalikkoa, ja lokit 21.22:lta (laitteen Documents säilyy, hae tuo vanhat). PT huomasi. Ketjujen "VALMIS"-rivi ei todista mitään; uudet ketjut sanovat AJETTU.
- Esikatselu ja laitekäännös jakavat linjan 1 lukon (/tmp/matkakirja-kaannospalvelu.lukko). "ALOITUS" lokissa ei tarkoita ajossa: k10 odotti lukkoa 8 min.
  Katso `kuka`-tiedostot. Linja 2 = /tmp/matkakirja-kaannospalvelu-2.lukko.
- `ui suora` toimii vain aloitusnäkymästä (ei `ui jatka` edelle) ja vain ea2d6912f:n sisältävissä rungoissa; kuittaus "ok" = vain hyppy käynnistyi (NUI).
- `matka pariisi` ei käy nykyisellä laitetallennuksella (peninkulma ei tässä pelissä, "Bussi ei kulje tuonne"); `aja lat lon` toimii kartalta suoraan.
- Rc=17 + puuttuvat il2cpp-symbolit: unity67-laitevälimuisti sekaisin; NS siivosi (Build/laite, dd-laite) → seuraava käännös kunnossa. NS:n projekti, ei omin päin.
- Kuvapolut: koodin OsatOsoite on kohtaamiset/piirroskartta/kartta-osat/ (NS:n viesti sanoi ensin kartta-osat/; NS vahvisti oikean). Tarkista viennissä.
- vie-paketti heti HEAD-404:n jälkeen voi näyttää hetken 404; tarkista ?t=<aika>-parametrilla. Laitteen asennuksen tail -1 "? options:" on devicectlin tuloste, ei virhe (ei todistettu erikseen; kuvat kertovat).
- Älä muokkaa odottavan zsh-ketjun tiedostoa: tapa oma pid, korjaa, käynnistä uudelleen. Siirrä vanhat lokit ensin, jos muut ketjut odottavat niiden rivejä.
- Monirivinen heredoc + `$(...)` + `${(f)}` Bashissa voi laukaista rm-turvatarkistuksen: pidä komennot yksinkertaisina.

## Käynnissä / jonossa (pid-tiedostot julkaisija-tyokalut/)
Linja 1 (lukko: PK palvelijat v6 c35e3d150, alkoi 22.54; pitkä):
- pk-palvelijat-v6-l1 → valmis-rivi PK | lav-v123-l1 (runko d667da301, tausta v123: 5, 5d, 5e → yangxin-kivetys/kuvat-v123/; polku LAV:lle) | vs-teravyys-43df66241 (laitekäännös, kilpailee lukosta).
Linja 2:
- ns-7cac734dd-l2 (alkoi 23.00) → ns-f5b3c3361-l2 → vs-k11-l2 (k11/ajo.zsh, 43df66241). NS:n tulokset PT:lle + NS; k11-hakemisto VS:lle (session id sama, VS nollautuu).
Iso iPad (lukko /tmp/matkakirja-ipad.lukko, trapilla; järjestys):
1. nui-sauma-laite (3176be95f, käynnissä; iso-1). sauma-a katsottu = Pariisi → UUSINTAA EI TARVITA (nui-sauma-iso1-ok). Kun ajo loppuu: kuvat + kansio lokit/nui-sauma-laite-20261103/iso-1 → NUI, ja katso muut kuvat.
2. laite-koealue2-fb7ff2595 (ui jatka + aja; KUVAT KATSOTTAVA, n-lahi/p-lahi/keski/laaja, muistivahti-aika tuore?) → PT + VS + NS.
3. savu2-4397cf20d (mittaa-suora.zsh iso 4397cf20d-2: ui suora pariisi-lahizoom, kohdenosto; tarkista ui-lokista kohdenosto + muistivahti tuore) → PT + NUI.
4. nui-ipad2 (sali-ys ilman ui jatka, iso-4397cf20d-sali-ys2/; katso kuvat: oltava sali) → NUI.
5. vs-teravyys-43df66241 (PT: iso iPad VS:lle; `ajetaan kuva teravyys`, katso kuva) → VS + PT.
Lopuksi KOKO PARIISI iso iPad (vieritys + muisti), kuvat täysikokoisina PT:lle: odottaa VS:n hyväksyttyä versiota (KK palautti k10:n; VS koko 135e03994 PERUTTU PT, tulos esikatselu 22.49–22.55 EI käytössä).

## ISO PAKETTI (juna 218, wt /Users/Shared/Claude/wt/julkaisija-koe-218)
4397cf20d nykyinen kärki; ensimmäinen savu EI pätevä (Pariisiin ei päästy, kortti ei auennut, sali-ys Lontoon karttaa).
SEURAAVA KIERROS, kun savu2 + sali-ys2 OK: 4397cf20d + NUI 7f0ccc451 (soikiopari PT kuittasi OK) + PK jalki v3 9d02ae999 (PT junalupa; merget puhtaat kokeiltu) → sama savu + muistivahti → SHA PT + NUI. Palvelijat v5/v6 EI (PK:n tulos ensin).
EI liitetä: c2eea58ea (PT, päätös peruttu). TF vain omistajan pyynnöstä; alkulennon otsikot (PK) kesken, kirjattu junaan 218.

## Yötyö (PT 22.5x, omistaja 22.31: koko Pariisi aamuksi)
Ohje: Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-pariisi-ylaviisto-ja-osakirjasto.md (YÖ 3.–4.11.). VS:n ja NS:n Pariisi-pyynnöt ohittavat muut ensimmäiselle vapaalle linjalle.

## Valmiit tällä vuorolla (lähetetty)
Soikiopari (PT OK) | NUI sauma editori 3 ajoa (viimeinen esikatselu-20261103-223329) | NS eb1749604, 993075f27 | PK jalki v3, palvelijat v5 | VS k9, k10 (KK palautti)
| LAV aukiokuvat 219c, v121, v122 | Viennit: tausta v121, v122, v123, notre-dame-alue-v2, puu-60-v1, louvre-alue-v1 + v2. NS:n 53bcfffb5 peruttu ajamatta.

## LISÄYS 23.05 (korvaa ristiriidassa olevat kohdat yllä)
- VS k11 PERUTTU (ei alkanut). Linja 2: ns-7cac734dd → ns-f5b3c3361 korjatulla skenaariolla sk-koealue-elava-ju.txt (ui sulje + odota 50: Ranskan saapuminen vei kameran; 993075f27:n ja 7cac734dd:n nd-lahi ei kelpaa).
- Terävyyskuva on d64f74a56 (vs-teravyys-d64f74a56.zsh, pid vs-teravyys.pid), ei 43df66241. PT kuittasi 993075f27:n nd-keski + nd-laaja. KATSO JOKAINEN KUVA ennen valmis-riviä (PT).

## LISÄYS 23.10
- Linja 2: f5b3c3361 → ns-9528c1d53-l2 ("k11 koe", EI JUNAAN, sk-koko-nahtavyydet-ju.txt) → kuvat PT:lle; katso kaikki. Eiffel + Riemukaari v1 viety.
- Iso iPad, ei junaan: ns-9528-laite.zsh (PT): 9528c1d53 lähi, keski, laaja, sauma (NUI-kamera), sauma-2351 → täysikokoiset PT:lle; käännös terävyyskäännöksen jälkeen, iPad savu2:n jälkeen.
