# Pelikoodari: luovutus 09.11.2026 klo 07.46

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %). Edellinen: `git show 8eb0c3990:docs/raportit/viesti-pelikoodari-luovutus-20261109-0201.md` (kohdat 2 ja 3 ennallaan).
Työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara pelikoodari/juoksu-223 (natiivi-backup), kärki 281093d9c.

## 1. d2 ovikuva (KK 9.11. 01.5x, "ovi ja eunukin kasvot kuvassa ≥ 1,2 s kaikilla koilla") – KESKEN, JU-ajo käynnissä
- 451519f87 Mac-kuvat (JU ketju V, lokit/pk-d2-ovikuva-<koko>-451519f87): iPhone vaaka ja iPad vaaka KELPAAVAT (kasvot + keisari d2a–d2c);
  iPhone pysty EI (eunukki ei kuvaan, keisari vasemmasta reunasta ulos). PT:lle kerrottu 07.2x.
- 4c1d100a2: ovikuvassa nopea katsejousi (JuoksuAvaus.OviKatseJousiS 0,1 s / 240°/s), kenttä jousen jälkeisestä katseesta
  (JuoksuAvaus.KatseenKentta), keisari aina kuvassa (RajaaKuvaan oviMax-kentällä), malli kasvot lehden kärjessä (KurkistusKasvotArvio,
  kummankin sivun heikompi, OviVaraAste 2°): malli iPhone pysty 1,36 s. Lokiin rivit "ovikuva tarve …", "ovikuva t …", "ovikuva kasvot …".
- JUURISYY Mac-ajossa: batch-ruutu 640×480 → juoksukameran Kamera.aspect 1,33 myös pystykuvassa (loki "puolikkaat 25.2°/19.4°", max 60°),
  pystykuva rajattiin 4:3:sta → tarve 0. Korjaus 281093d9c: `ui juoksupeli kuvasuhde laite` (JuoksuV4Maailma.KuvasuhdeLaite, testiruudun
  kuvasuhde). Rivi lisätty sk:hon proto-3d/_tyo/pelikoodari/juoksu-223/sk-d2-ovikuva.txt (siksi 4c1d100a2 vaaka/iPad 0/5 – ei vika).
- Mittaus 4c1d100a2: kasvot oven pisteestä kujalle −0,13…0,23 m, sivu ~0,8 m (malli 1,0/±0,6 → voi tarkentaa: ulos ~0,1, sivu 0,8).
- JU ketju AD (pid 73792) ajaa 281093d9c: iphone, iphone-vaaka, ipad → lokit/pk-d2-ovikuva-<koko>-281093d9c.
  TEE: katso d2a–d2c + video (kasvot ja keisari kuvassa, ei hyppyä kentässä; grep "ovikuva" unity.log: tarve > 0 pystyssä, puolikkaat ~9°/19°).
  Kelpaa kaikissa → kuvat KK:lle (local_37f7c945-e1a0-4638-90b8-93c389a36fbe, edellinen PK raportoi KK:lle suoraan) + 3 riviä PT:lle;
  KK hyväksyy → junaan 223 PT:n kautta. Ei kelpaa → lokin ovikuva-riveistä syy (tarve/kenttä/keisari rajattu).
- Muista: ÄLÄ muuta sk-tiedostoa JU:n ketjun aikana.
