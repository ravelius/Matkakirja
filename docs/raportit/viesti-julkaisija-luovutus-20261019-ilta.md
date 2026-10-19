# Julkaisijan luovutus 19.10.2026 klo 17.20 (ilta)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150). Edellinen: `viesti-julkaisija-luovutus-20261019-paiva.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md. Viestit `mcp__ccd_session_mgmt__send_message` id:llä. Levy 47 Gi, kuorma ~30–60.

## 0. PYSYVÄT TILAT
- **Juna 204 PYSÄYTETTY** (omistaja 11.46): ei lukitusta eikä TF-/web-vientiä ennen korjauksia + erillistä julkaisupyyntöä.
- **Uusi sääntö (omistaja 15.21, Raamattu 9.11):** lukitun junan pelaa Laitetestaaja iPadilla + iPhone-simulla ENNEN ulkoisia testaajia.
- **Olavinlinna TAUOLLA** (omistaja 17.05): ei linnan käännöksiä/simuja (PJ 6963950c3 poistettu jonosta).
- **Kuormaraja (PT):** 2 linjaa + 2 simua; jos kuorma > 100 tai levy < 30 Gi → YKSI linja + 1 simu ja rivi PT:lle. Paluu kahteen vain PT:n kuittauksella.

## 1. KÄYNNISSÄ NYT (kaikki nohup-irrotettuja → jatkuvat nollauksen yli)
- **L1:** `ketju-1705.zsh 1` (pid 31676): NUI valikko-jatko 77959b117 (lukossa 17.09) → LAVASTAJA kehyskiilto ea0fe613a → TKS juna 204 48924e0d8.
- **L2:** PK kaaro-v2b 1dc6448e9 (orpo pid 31684, lukossa 17.06; loki pk-kaaro-v2b-204-kaanna.log) → `ketju-1708-l2.zsh` (pid 63283) odottaa pid 31684:n loppua, kirjaa "L2 VAPAA" ja ajaa: NUI valikko-jatko2 90127efc5 → PK kuvalähde 5890ccd32. Sen jälkeen `vs-pimennys-k6-kaanna.zsh` (pid 49227): VS c2420def7 → _tyo/linssiseppa2/nostot-app.
- **Valovahti** `valoseppa-vahti.zsh` (pid 67517): JU:n oma VS-haarojen automaattikäännös (omistaja 14.10.). Haaralistaan lisätty poissulut iss-nostot-204, nostokortti(-b)-204, iss-kamerat-204 (käsipyynnöt). Simuvuoro: `touch /tmp/matkakirja-valovahti-simu.nyt`; tauko: `/tmp/matkakirja-valovahti-tauko`. Hurrikaani-196 simu alkoi 17.07.
- **Simuilla:** LS 41b4854f (BD64C8E4, 2 ajoa) + valovahti hurrikaani.

## 2. KUN KÄÄNNÖS VALMISTUU → ILMOITA (KÄÄNNETTY + app-polku + SIMU NYT)
| käännös | rooli | app | simu |
|---|---|---|---|
| 77959b117 | NUI | _tyo/julkaisija/juna204-valikko-jatko-app | iPhone+iPad valikko + B3-iPad (omistaja odottaa) |
| 1dc6448e9 | PK | _tyo/julkaisija/juoksupeli-kaaro-v2b-204-app | oma pelikoodari-iPad13 ~6 min (aja-b.zsh); avoimet-v2 jo ämpärissä |
| 90127efc5 | NUI | _tyo/julkaisija/juna204-valikko-jatko2-app | iPhone+iPad ~15 min (Aarnin luettelo) |
| ea0fe613a | Lavastaja | _tyo/linnanrakentaja/kehyskiilto-204-app | oma iPhone 484B130B ~7 min (ajo-kehyskiilto-204.zsh) |
| 5890ccd32 | PK | _tyo/julkaisija/kuvalahde-linkki-204-app | oma iPad13 (SK:n v2-kuvat jo ämpärissä) |
| c2420def7 | VS | _tyo/linssiseppa2/nostot-app | lyhyt B5 (vain pimennys) |
| 48924e0d8 | Työkaluseppä | _tyo/julkaisija/juna204-ennen-junaa-app | iPhone 18 Pro 0AC1815C, ennen-junaa.sh ~20 min (testi, ei lukitus) |
Etusija simuissa: omistajan odottamat (NUI) ja juna 204 -ehdot.

## 3. Tänään viety (vie-paketti.sh, 0 virhettä)
Aamu: ks. edellinen luovutus. Iltapäivä: koopenhamina-havainnekuvat (v11 8, k1 v12 2, k8 v13 2), juoksupeli-kirjoitukset-v1 (5), juoksupeli-kaaro-v2 (3),
juoksupeli-sisapiha-v2.glb (1), historiakuvat-by-sa (33, esittely/*-historia-v2/), aarrekuvat-tumma-sheba-montezuma (2), aarrekuvat-kongo (1), juoksupeli-avoimet-v2 (10).
PR 4984 OPEN – EI mergetä ennen Manta+Raiatea v2 -hyväksyntää (PT).

## 4. Opit
- **SHA-vaihto jonossa:** vain jos käännös ei ole alkanut. Tarkista `cat /tmp/matkakirja-kaannospalvelu{,-2}.lukko/kuka` ENNEN kuin tapat ketjun: 17.07 tapoin L2-ketjun, vaikka 1dc6448e9 oli jo lukossa → orpo + tupla (korjattu). Älä tapa ketjun äitiä, jos lapsi on lukossa.
- vie-paketti.sh: LAHTEET.md juureen mutta EI SHA256SUMS-listalle; katselukuvat pois paketista; ei ylikirjoitusta → uusi polku (-v2).
- Simulaattorit: roolien omat (proto-3d/tyokalut/simusarja-udid.tsv); BD64C8E4 on Linssisepän, Lavastaja 484B130B, VS 8D1FD618 + A26BC7D0.
- Valovahti voi kääntää taustalla tuntemattomalta näyttävän sha:n (05d3bb32c) – katso `valoseppa-vahti.log` ennen hälytystä.
