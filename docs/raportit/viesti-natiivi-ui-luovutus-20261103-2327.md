# Natiivi-UI: luovutus 3.11.2026 klo 23.27 (konteksti 25 %, pehmeä raja)

Edellinen: viesti-natiivi-ui-luovutus-20261103-2241.md (sen jono käsitelty tähän). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto, peili natiivi-backup peili/proto/<haara>.

## Tehty
- Vanhat luovutus-PR:t 6189, 6194, 6200 ja 6229 mergetty.
- **Pariisin sauma, iPad iso-1** (3176be95f, k8-kamera, lokit/nui-sauma-laite-20261103/iso-1): nykyasetus terävä, ei saumaa. Muistivahti OK, huippu 3455 Mt. **HUOM: 3176be95f:ssä ei ole koealuetta eikä A2-pintaa, joten tämä todistaa vain pohjan** (PT korjasi 23.1x, VS tietää). KK:n A2-pinnalla näkemä sauma on AUKI.
- **Esikatselun korjaus b116b65a5** (natiivi-ui/esikatselu-laatat-218, wt/proto-natiivi-ui-sauma, peilissä): Esikatselu.PidaLaitteenLaatat, ylimääräinen piirtämätön kamera kartan pallolle laitteen ruudun koossa. Vain batch; pois: MATKAKIRJA_ESIKATSELU_RUUDUN_LAATAT=1. Kääntämättä ja ajamatta. PT: saa jatkua.
- **`ui suora` -vika, minun 40ed9da3c:ni:** Testihypyt lähetti ui-rivit ilman ui-etuliitettä (UiKomennot.Aja:641 "tuntematon komento"), joten salit ja juoksupeli-taso1 jäivät kartalle. Korjaus **4a24938fc** (natiivi-ui/aloitukset-218, peilissä, Peli-testit Testihypyt 6/6, tarkista.sh:n loppu ilman virhettä), laitteella todistamatta. Mergepyyntö NS:llä (jonossa 23.25).
- Tärkeä: `ui suora` toimii VAIN aloitusnäkymästä (ei `ui jatka` ennen sitä), ja sen "ok" tarkoittaa vain, että hyppy käynnistyi; virheet menevät Debug.Logiin, ei ui-lokiin.

## SEURAAJAN JONO
1. **Sauma A2:lla (PT:n sulkuehto):** JU ajaa isolla iPadilla k11-kokeen jälkeen `mittaa-sauma-koealue.zsh iso a2-9528c1d53` (_tyo/natiivi-ui/sauma-pariisi/, koealue päällä, sama kamera; ajamatta ennen tätä). Tulos lokit/nui-sauma-laite-20261103/iso-a2-9528c1d53 (sauma-a2-45s/90s.png). Tarkista ENSIN, että kuvassa on korttelipinta, ei tasainen vektorikartta. Rivi PT:lle + VS:lle.
   - Ei saumaa → asia kiinni. Sauma → A/B jatkuu: c rajattuna lähitasoille (LiikeLaatatPaatos) gpuMs:n ja muistin mukaan, sitten kylmä ajo ja pieni iPad.
   - Älä käytä k12:ta 8ee595926 saumakuvaan: siinä on oma vaakasauma (VS). d64f74a56, a57c0b473 ja 9528c1d53 käyvät.
2. **Salin savu:** JU ajaa `mittaa-sali.zsh iso sali-ys3-4397cf20d` (4397cf20d, ei uutta käännöstä). PT: ei kolmatta samanlaista ajoa; jos sali-ys-40s.png ei ole sali, keskeytä ja selvitä. Tulos lokit/nui-lahizoom-20261103/iso-sali-ys3-4397cf20d. Sali OK → rivi JU:lle (se katsoo ruudun ennen seuraavaa pakettia).
3. **Esikatselun A/B:** JU ajaa `ajo-laatat.zsh <linja> b116b65a5` linjalla 2 VS:n k12-sarjan ja NS:n 8327359d1:n jälkeen. Rivi "LAATAT VALMIS … <kansio>". Vertaa laatat-40s/85s laitteen iso-1/sauma-a:han ja esikatselu-20261103-223329:n a:han; katso valkoiset aukot ja ajoaika. Ei aukkoja → mergepyyntö NS:lle + rivi VS:lle; aukkoja → oletus pois päältä tai pidempi odotus, kerro VS:lle.
4. Soikiopari: jos KK hylkää, palauta VarjoKuva/0,5 (7f0ccc451:n TraileriLiike) ja kysy PT:ltä.
5. Elävä kartta vaihe 2 vasta KK:n/PT:n suunnitelman jälkeen.
6. Avoin (pohjat-tarkistus D6): TraileriLiike lisää yhä luokan mk-traileri__varjo ilman USS-sääntöä; siivous kun koskee tiedostoon.

## Muuta
- mittaa-sauma-suora.zsh on ajamaton varapolku ilman koealuetta; iso-2 peruttu, koska iso-1 oli Pariisista.
- Esikatselun sudenkuoppa: kamera-ajo ennen maan saapumista kumoutuu; `ui sulje` + `odota 50` ennen `aja`.
