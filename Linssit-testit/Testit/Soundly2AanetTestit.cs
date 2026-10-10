// PALLON KAUPUNKIÄÄNET, SOUNDLY v2 (Linssiseppä 10.10.2026; juna 182, Pelikoodarin aanet/pallo-soundly-v2): manifesti, sisäiset
// tunnukset ja mikserin rivit, tuulen korkeuskäyrä, tornikellon tuntisarja vain oikealla lyöntimäärällä ja puolen tunnin lyönti,
// kirkonkellojen soitto heiluvien kellojen rinnalla, lokit laitureilla, kyyhkyt toreilla, laivan torvi kaukaa, raitiovaunun kello
// ohiajossa, erän 1 korvattavat lähteet pois, IhmisAanetin sarjat, kertojan alla ja deterministisyys.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aanet;
using Matkakirja.Linssit.Elava;

namespace Matkakirja.Linssit.Testit
{
    static class Soundly2AanetTestit
    {
        const double Dt = 0.1;

        [Testi] static void ManifestiTunnuksetJaMikseri()
        {
            var m = PalloSoundly2Aanet.Lue("{\"versio\":2,\"aanet\":[{\"tunnus\":\"lokki-01\",\"aani\":\"lokki-01.mp3\",\"silmukka\":false,\"kesto_s\":1.07,\"ryhma\":\"maisema\"}," +
                "{\"tunnus\":\"kyyhky-kujerrus-02\",\"aani\":\"kyyhky-kujerrus-02.mp3\",\"silmukka\":false}," +
                "{\"tunnus\":\"tuuli-tasainen-01\",\"aani\":\"tuuli-tasainen-01.mp3\",\"silmukka\":true,\"kesto_s\":60},{\"tunnus\":\"\",\"aani\":\"x.mp3\"}]}");
            Oleta.Sama(3, m.Aanet.Count, "tyhjä tunnus ohitetaan");
            Oleta.Tosi(m.Aanet.ContainsKey("soundly2-kyyhky-kujerrus-02") && !m.Aanet.ContainsKey("kyyhky-kujerrus-02"), "erän 1 kanssa päällekkäinen etuliitteellä");
            Oleta.Sama(PalloSoundly2Aanet.Juuri + "kyyhky-kujerrus-02.mp3", m.Aanet["soundly2-kyyhky-kujerrus-02"].Osoite, "tiedosto alkuperäisellä nimellä");
            Oleta.Tosi(m.Aanet["tuuli-tasainen-01"].Silmukka && !m.Aanet["lokki-01"].Silmukka, "silmukka-kenttä");
            Oleta.Sama(PalloSoundly2Aanet.Juuri + "lokki-01.mp3", m.Aanet["lokki-01"].Osoite);
            var kaikki = new HashSet<string>(PalloSoundly2Aanet.Tunnukset());
            Oleta.Sama(37, kaikki.Count, "37 ääntä");
            var muut = new HashSet<string>(PalloElavaAanet.Tunnukset()); muut.UnionWith(PalloKaupunkiAanet.Tunnukset()); muut.UnionWith(PalloSoundlyAanet.Tunnukset()); muut.UnionWith(PalloLentoAanet.Tunnukset());
            foreach (var t in kaikki) { Oleta.Tosi(!muut.Contains(t), "ei päällekkäin: " + t); Oleta.Sama("maisema", PalloSoundly2Aanet.MikseriAani(t).Ryhma, t); }
            foreach (var t in new[] { PalloSoundly2Aanet.KyyhkyKujerrus[0], PalloSoundly2Aanet.KyyhkySiivet[1], PalloSoundly2Aanet.RaitioKello[1] })
                Oleta.Tosi(t.StartsWith(PalloSoundly2Aanet.Etuliite), "päällekkäinen erän 1 kanssa: " + t);
            Oleta.Tosi(!PalloSoundly2Aanet.Lokki[0].StartsWith(PalloSoundly2Aanet.Etuliite) && !PalloSoundly2Aanet.TuuliTasainen.StartsWith(PalloSoundly2Aanet.Etuliite), "uudet sellaisenaan");
            var idt = new HashSet<string>();
            foreach (var a in PalloElavaAanet.Mikseri) idt.Add(a.Id); foreach (var a in PalloKaupunkiAanet.Mikseri) idt.Add(a.Id);
            foreach (var a in PalloSoundlyAanet.Mikseri) idt.Add(a.Id); foreach (var a in PalloLentoAanet.Mikseri) idt.Add(a.Id);
            foreach (var a in PalloSoundly2Aanet.Mikseri)
            {
                Oleta.Tosi(idt.Add(a.Id), "jokaiselle aiheelle oma rivi: " + a.Id);
                foreach (char c in a.Id) Oleta.Tosi((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '.' || c == '-', "mikserin tunnus " + a.Id);
            }
            var mk = new Aanimikseri();
            foreach (var a in PalloSoundly2Aanet.Mikseri) mk.Rekisteroi("pallo", a.Ryhma, a.Id, a.Nimi, a.Klipit);
            Oleta.Sama(11, mk.AanetRyhmassa("pallo", "maisema").Count, "11 riviä maisemassa");
            Oleta.Tosi(mk.Rekisteroity("tornikello-tunti-03") && mk.Rekisteroity("soundly2-raitiovaunu-kello-02") && mk.Rekisteroity("elava.tuuli-korkealla"), "klipit äänivahdille");
        }

        [Testi] static void TuuliKorkeudenMukaan()
        {
            Oleta.Sama(0.0, PalloSoundly2Aanet.TuuliKorkeudesta(double.NaN), "korkeus ei tiedossa: hiljaa");
            double katu = PalloSoundly2Aanet.TuuliKorkeudesta(0), ylla = PalloSoundly2Aanet.TuuliKorkeudesta(PalloSoundly2Aanet.TuuliTaysiM);
            Oleta.Tosi(katu > 0 && katu <= 0.15 * ylla, $"katutasolla hiljainen ({katu:F3} / {ylla:F3})");
            Oleta.Tosi(Math.Abs(ylla - PalloSoundly2Aanet.TuuliTaso) < 1e-12 && PalloSoundly2Aanet.TuuliKorkeudesta(2000) == ylla, "kaupungin yllä täysi, ei kasva enempää");
            double ed = -1, maxAskel = 0;
            for (double h = -20; h <= 600; h += 1)
            {
                double t = PalloSoundly2Aanet.TuuliKorkeudesta(h);
                Oleta.Tosi(t >= ed - 1e-12, $"nousee korkeuden mukaan ({h} m)");
                if (ed >= 0) maxAskel = Math.Max(maxAskel, t - ed); ed = t;
            }
            Oleta.Tosi(maxAskel < 0.003, $"pehmeä käyrä (suurin askel {maxAskel:F4}/m)");
            // Ytimessä tuuli liukuu (ei hyppyä nousussa 20 → 300 m).
            var s = new Soundly2Aanet(1, null, null); double edT = 0, maxT = 0;
            for (double t = 0; t < 30; t += Dt) { double k = t < 10 ? 20 : 300; s.Aloita(t, 0, k, 0, k); s.Valitse(Dt); maxT = Math.Max(maxT, Math.Abs(s.Tuuli - edT)); edT = s.Tuuli; }
            Oleta.Tosi(Math.Abs(s.Tuuli - PalloSoundly2Aanet.TuuliKorkeudesta(300)) < 0.01 && maxT <= PalloSoundly2Aanet.TuuliTaso * Dt / KaupunkiAanet.TaustaLiukuS + 1e-9, $"liukuu ({maxT:F4})");
        }

        static KaupunkiAanet Kirkko(int siemen, Predicate<string> saatavilla = null)
        {
            var a = new KaupunkiAanet(siemen) { Saatavilla = saatavilla }; a.Kirkot.Add((60, 0)); a.Indeksoi(); return a;
        }

        static List<(double T, KaupunkiAanet.Kerta K)> Aja(KaupunkiAanet a, double alkuTunti, double kesto, double kx = 0, double korkeus = 30)
        {
            var l = new List<(double, KaupunkiAanet.Kerta)>();
            for (double t = 0; t < kesto; t += Dt) { a.Paivita(t, Dt, kx, 0, korkeus, alkuTunti + t / 3600, false); foreach (var k in a.Kerrat) l.Add((t, k)); }
            return l;
        }

        [Testi] static void TornikellonTuntisarjaVainOikeallaLyontimaaralla()
        {
            Oleta.Sama(PalloSoundly2Aanet.TornikelloTunti[0], PalloSoundly2Aanet.TuntiSarja(11));
            Oleta.Sama(PalloSoundly2Aanet.TornikelloTunti[1], PalloSoundly2Aanet.TuntiSarja(9));
            Oleta.Sama(PalloSoundly2Aanet.TornikelloTunti[2], PalloSoundly2Aanet.TuntiSarja(4));
            Oleta.Sama((string)null, PalloSoundly2Aanet.TuntiSarja(12));
            // Klo 23 (= 11 lyöntiä): koko sarja kerran, heiluvat kellot vasta sarjan jälkeen.
            var l = Aja(Kirkko(9), 22.95, 300);
            var lyonnit = l.FindAll(x => x.K.Lyonti > 0);
            Oleta.Sama(1, lyonnit.Count, "tuntisarja kerran");
            Oleta.Sama(PalloSoundly2Aanet.TornikelloTunti[0], lyonnit[0].K.Tunnus);
            Oleta.Tosi(lyonnit[0].K.Tasatunti && lyonnit[0].K.X == 60 && lyonnit[0].K.Taso > 0 && Math.Abs(lyonnit[0].T - 180) <= Dt + 1e-9, "tasatunnilla lähimmästä kirkosta");
            var heiluva = l.Find(x => x.K.Lyonti == 0 && x.K.Tasatunti);
            Oleta.Tosi(heiluva.K != null && heiluva.T >= lyonnit[0].T + PalloSoundly2Aanet.TuntiKestoS - Dt, $"heiluvat kellot sarjan jälkeen ({heiluva.T:F1} s)");
            // Ilman v2:ta (ei ladattu): 11 erän 1 lyöntiä kuten ennen.
            var v1 = Aja(Kirkko(9, t => !t.StartsWith("tornikello")), 22.95, 300).FindAll(x => x.K.Lyonti > 0);
            Oleta.Tosi(v1.Count == 11 && v1.TrueForAll(x => Array.IndexOf(PalloSoundlyAanet.Lyonnit, x.K.Tunnus) >= 0), $"ilman v2:ta 11 lyöntiä ({v1.Count})");
            // Klo 15 (3 lyöntiä): ei sopivaa sarjaa → erän 1 lyönnit.
            var kolme = Aja(Kirkko(9), 14.95, 300).FindAll(x => x.K.Lyonti > 0);
            Oleta.Tosi(kolme.Count == 3 && kolme.TrueForAll(x => Array.IndexOf(PalloSoundly2Aanet.TornikelloTunti, x.K.Tunnus) < 0), "väärä lyöntimäärä → erän 1 lyönnit");
            // Klo 4 ja 21 (9 lyöntiä) omat sarjansa.
            Oleta.Sama(PalloSoundly2Aanet.TornikelloTunti[2], Aja(Kirkko(9), 3.95, 300).Find(x => x.K.Lyonti > 0).K?.Tunnus);
            Oleta.Sama(PalloSoundly2Aanet.TornikelloTunti[1], Aja(Kirkko(9), 20.95, 300).Find(x => x.K.Lyonti > 0).K?.Tunnus);
        }

        [Testi] static void PuolenTunninLyonti()
        {
            const int S = 9;
            var l = Aja(Kirkko(S), 10.0, 3600 + 5);
            var puoli = l.FindAll(x => x.K.Puolitunti);
            Oleta.Sama(1, puoli.Count, "tunnissa yksi puolen tunnin lyönti");
            Oleta.Tosi(Math.Abs(puoli[0].T - 1800) <= Dt + 1e-9 && puoli[0].K.Lyonti == 0 && !puoli[0].K.Tasatunti && puoli[0].K.X == 60, $"klo 10.30 ({puoli[0].T:F1} s)");
            Oleta.Sama(PalloSoundly2Aanet.PuoliLyonti(60, 0, S), puoli[0].K.Tunnus, "kirkon oma kello");
            Oleta.Tosi(puoli[0].K.Taso > 0 && puoli[0].K.Taso <= PalloSoundly2Aanet.PuoliTaso, "taso etäisyydestä");
            Oleta.Sama(1, l.FindAll(x => x.K.Lyonti == 1).Count, "tasatunti (11) kerran");
            Oleta.Sama(0, Aja(Kirkko(S), 10.4, 600, 400).FindAll(x => x.K.Puolitunti).Count, "kirkko yli 250 m: ei lyöntiä");
            Oleta.Sama(0, Aja(Kirkko(S), 10.4, 600, 0, KaupunkiAanet.KorkeusRajaM + 10).FindAll(x => x.K.Puolitunti).Count, "kamera korkealla: ei lyöntiä");
            Oleta.Sama(0, Aja(Kirkko(S, t => !t.StartsWith("tornikello")), 10.4, 600).FindAll(x => x.K.Puolitunti).Count, "lataamaton: hiljaisuus");
            // Kello kirkon siemenestä: molemmat esiintyvät, sama kirkko = sama kello.
            var n = new Dictionary<string, int>();
            for (int i = 0; i < 200; i++) { string k = PalloSoundly2Aanet.PuoliLyonti(i * 137.3, -i * 71.9, S); n[k] = n.TryGetValue(k, out var c) ? c + 1 : 1; Oleta.Sama(k, PalloSoundly2Aanet.PuoliLyonti(i * 137.3, -i * 71.9, S)); }
            Oleta.Tosi(n.Count == 2 && Math.Min(n[PalloSoundly2Aanet.TornikelloLyonti[0]], n[PalloSoundly2Aanet.TornikelloLyonti[1]]) >= 60, "lyönnit 01 ja 02 kirkoittain");
            // Kuuntelu: opas kaupunkiaanet puoli.
            var p = Kirkko(S); p.Pakota("puoli");
            Oleta.Sama(1, Aja(p, 10.1, 10).FindAll(x => x.K.Puolitunti).Count, "pakotettu lyönti heti");
        }

        [Testi] static void KirkonkellojenSoittoRinnalla()
        {
            var tul = Aja(Kirkko(5), 8.0, 6 * 3600, 100, 50).FindAll(x => Array.IndexOf(KaupunkiAanet.HeiluvatKellot, x.K.Tunnus) >= 0);
            int soitto = tul.FindAll(x => Array.IndexOf(PalloSoundly2Aanet.KirkonkelloSoitto, x.K.Tunnus) >= 0).Count;
            Oleta.Tosi(soitto > 0 && soitto < tul.Count, $"soitto ja heiluvat kellot sekaisin ({soitto}/{tul.Count})");
            Oleta.Sama(10, KaupunkiAanet.HeiluvatKellot.Length);
            var v1 = Aja(Kirkko(5, t => !t.StartsWith("kirkonkello-soitto")), 8.0, 3600, 100, 50).FindAll(x => Array.IndexOf(KaupunkiAanet.HeiluvatKellot, x.K.Tunnus) >= 0);
            Oleta.Tosi(v1.Count > 0 && v1.TrueForAll(x => Array.IndexOf(PalloKaupunkiAanet.Kirkonkello, x.K.Tunnus) >= 0), "lataamaton soitto suodatetaan");
        }

        static readonly List<(double, double, double)> Laiturit = new List<(double, double, double)> { (0, 90, 2), (2000, 0, 2) };
        static readonly List<(double, double)> Torit = new List<(double, double)> { (20, -10), (3000, 0) };

        static List<(double T, Soundly2Aanet.Tapahtuma E)> AjaV2(int siemen, double korkeus, double kesto = 1800, List<(double, double, double)> laiturit = null, Predicate<string> saatavilla = null)
        {
            var s = new Soundly2Aanet(siemen, laiturit ?? Laiturit, Torit) { Saatavilla = saatavilla }; var tul = new List<(double, Soundly2Aanet.Tapahtuma)>();
            for (double t = 0; t < kesto; t += Dt) { s.Aloita(t, 0, korkeus, 0, korkeus); s.Valitse(Dt); foreach (var e in s.Kerrat) tul.Add((t, e)); }
            return tul;
        }

        static void Valit(List<(double T, Soundly2Aanet.Tapahtuma E)> l, double min, double max, string nimi)
        {
            string ed = null;
            for (int i = 0; i < l.Count; i++)
            {
                if (i > 0) Oleta.Tosi(l[i].T - l[i - 1].T >= min - 1e-6 && l[i].T - l[i - 1].T <= max + Dt, $"{nimi}: väli {l[i].T - l[i - 1].T:F1} s");
                Oleta.Tosi(l[i].E.Tunnus != ed && l[i].E.Taso > 0, $"{nimi}: ei samaa peräkkäin, taso"); ed = l[i].E.Tunnus;
            }
        }

        [Testi] static void LokitLaitureilla()
        {
            var l = AjaV2(5, 20).FindAll(x => x.E.Laji == Soundly2Aanet.Laji.Lokki);
            Oleta.Tosi(l.Count >= 70 && l.Count <= 230, $"30 min: {l.Count} lokkia (väli 8–25 s)");
            Valit(l, Soundly2Aanet.LokkiValiMinS, Soundly2Aanet.LokkiValiMaxS, "lokki");
            foreach (var (_, e) in l)
                Oleta.Tosi(e.KolmeD && e.X == 0 && e.Z == 90 && e.Y >= 10 && e.Y <= 16 && Array.IndexOf(PalloSoundly2Aanet.Lokki, e.Tunnus) >= 0 && e.Taso <= PalloSoundly2Aanet.LokkiTaso, "laiturissa veden yllä");
            Oleta.Sama(0, AjaV2(5, 200, 600).FindAll(x => x.E.Laji == Soundly2Aanet.Laji.Lokki).Count, "kamera 200 m: ei lokkeja");
            Oleta.Sama(0, AjaV2(5, 20, 600, new List<(double, double, double)>()).FindAll(x => x.E.Laji != Soundly2Aanet.Laji.Kyyhky).Count, "ei laitureita: ei lokkeja eikä torvia");
            var vain = AjaV2(5, 20, 600, null, t => t == PalloSoundly2Aanet.Lokki[2] || t == PalloSoundly2Aanet.Lokki[4]).FindAll(x => x.E.Laji == Soundly2Aanet.Laji.Lokki);
            Oleta.Tosi(vain.Count > 0 && vain.TrueForAll(x => x.E.Tunnus == PalloSoundly2Aanet.Lokki[2] || x.E.Tunnus == PalloSoundly2Aanet.Lokki[4]), "vain ladatut");
        }

        [Testi] static void KyyhkytToreilla()
        {
            var k = AjaV2(8, 15).FindAll(x => x.E.Laji == Soundly2Aanet.Laji.Kyyhky);
            Oleta.Tosi(k.Count >= 60 && k.Count <= 180, $"30 min: {k.Count} kyyhkyä (väli 10–30 s)");
            Valit(k, Soundly2Aanet.KyyhkyValiMinS, Soundly2Aanet.KyyhkyValiMaxS, "kyyhky");
            int siivet = k.FindAll(x => Array.IndexOf(PalloSoundly2Aanet.KyyhkySiivet, x.E.Tunnus) >= 0).Count;
            Oleta.Tosi(siivet > 0 && siivet < k.Count / 2, $"siivet harvemmin ({siivet}/{k.Count})");
            Oleta.Tosi(k.TrueForAll(x => x.E.KolmeD && x.E.X == 20 && x.E.Z == -10 && Math.Abs(x.E.Y - 0.5) < 1e-9), "torilla maan tasolla");
            Oleta.Sama(0, AjaV2(8, 80, 600).FindAll(x => x.E.Laji == Soundly2Aanet.Laji.Kyyhky).Count, "kamera 80 m: ei kyyhkyjä");
        }

        [Testi] static void LaivanTorviKaukaaSatamakaupungissa()
        {
            var t = AjaV2(3, 120, 3 * 3600).FindAll(x => x.E.Laji == Soundly2Aanet.Laji.Torvi);
            Oleta.Tosi(t.Count >= 55 && t.Count <= 185, $"3 h: {t.Count} torvea (väli 1–3 min)");
            Valit(t, Soundly2Aanet.TorviValiMinS, Soundly2Aanet.TorviValiMaxS, "torvi");
            Oleta.Tosi(t.TrueForAll(x => !x.E.KolmeD && x.E.Taso == PalloSoundly2Aanet.TorviKaukanaTaso && Array.IndexOf(PalloSoundly2Aanet.TorviKaukana, x.E.Tunnus) >= 0), "2D kaukaa");
            Oleta.Sama(0, AjaV2(3, double.NaN, 900).Count, "korkeus ei tiedossa: ei mitään");
        }

        [Testi] static void RaitiovaununKelloOhiajossa()
        {
            var s = new Soundly2Aanet(4, Laiturit, Torit);
            var kellot = new List<(double T, string K, double Taso)>(); int kutsuja = 0;
            for (double t = 0; t < 4 * 3600; t += 12) { kutsuja++; var (k, taso) = s.OhiajonKello(t, 40); if (k != null) kellot.Add((t, k, taso)); }
            Oleta.Tosi(kellot.Count >= 0.12 * kutsuja && kellot.Count <= 0.3 * kutsuja, $"osassa ohiajoista ({kellot.Count}/{kutsuja})");
            for (int i = 1; i < kellot.Count; i++) Oleta.Tosi(kellot[i].T - kellot[i - 1].T >= Soundly2Aanet.RaitioValiMinS, "väli ≥ 45 s");
            foreach (var (_, k, taso) in kellot)
                Oleta.Tosi(Array.IndexOf(PalloSoundly2Aanet.RaitioKello, k) >= 0 && Math.Abs(taso - PalloSoundly2Aanet.RaitioKelloTaso * Ohiajot.Taso(40)) < 1e-12, "kello ja taso ohiajon etäisyydestä");
        }

        [Testi] static void Era1KorvattavatPois()
        {
            // SoundlyAanet: laituri ja aukio, ei parvia; liput pois → ei laituri-lokkeja, ei aukio-kyyhkyjä, ei raitiovaunun kelloa.
            var l = new List<(double, double, double)> { (0, 90, 2) }; var a = new List<(double, double)> { (20, -10) };
            foreach (bool paalla in new[] { true, false })
            {
                var s = new SoundlyAanet(5, l, a) { LaituriLokit = paalla, AukioKyyhkyt = paalla, RaitioKellot = paalla };
                int lokit = 0, kyyhkyt = 0, raitiot = 0, parvi = 0;
                for (double t = 0; t < 1800; t += Dt)
                {
                    s.Aloita(t, 0, 15, 0, 15); s.Raitio(3, 40 * Math.Sin(t / 30), 0, 30);
                    if (t > 900) s.Parvi(7, 50, 25, 0, false);
                    s.Valitse(Dt);
                    foreach (var e in s.Kerrat)
                    {
                        if (e.Laji == SoundlyAanet.Laji.Lokki) { if (e.Avain < 0) lokit++; else parvi++; }
                        else if (e.Laji == SoundlyAanet.Laji.Kyyhky) kyyhkyt++; else raitiot++;
                    }
                }
                Oleta.Tosi(paalla ? lokit > 10 && kyyhkyt > 10 && raitiot > 3 : lokit == 0 && kyyhkyt == 0 && raitiot == 0, $"erän 1 {(paalla ? "päällä" : "pois")}: lokit {lokit}, kyyhkyt {kyyhkyt}, raitio {raitiot}");
                Oleta.Tosi(parvi > 10, $"parven huudot jatkuvat ({parvi})");
            }
        }

        [Testi] static void IhmisAanetinSarjat()
        {
            foreach (var k in PalloSoundly2Aanet.PolkupyoraKello) Oleta.Tosi(Array.IndexOf(IhmisAanet.PyoranKellot, k) >= 0, "pyörän kelloihin: " + k);
            foreach (var k in PalloSoundly2Aanet.TorviLahi) Oleta.Tosi(Array.IndexOf(IhmisAanet.Torvet, k) >= 0 && Array.IndexOf(IhmisAanet.TorvetIso, k) >= 0, "laituritorviin: " + k);
            foreach (var k in PalloSoundly2Aanet.TorviKaukana) Oleta.Tosi(Array.IndexOf(IhmisAanet.Torvet, k) < 0, "kaukainen torvi ei laiturilla: " + k);
            string json = "{\"kadut\":[{\"t\":\"tertiary\",\"p\":[[0,-50],[300,-50]]}],\"reitit\":[{\"tyyppi\":\"lautta\",\"kiertava\":false,\"p\":[[-100,0,1],[-900,0,1]]}]}";
            var h = IhmisAanet.Lue(json, 4); int v2Kello = 0, v2Torvi = 0;
            for (double t = 0; t < 8 * 3600; t += 0.5)
            {
                var e = h.Paivita(t, 0, 0, 50); if (e == null) continue;
                if (Array.IndexOf(PalloSoundly2Aanet.PolkupyoraKello, e.Tunnus) >= 0) v2Kello++;
                if (Array.IndexOf(PalloSoundly2Aanet.TorviLahi, e.Tunnus) >= 0) v2Torvi++;
            }
            Oleta.Tosi(v2Kello > 0 && v2Torvi > 0, $"v2 kuuluu kaduilla ja laiturissa ({v2Kello} kelloa, {v2Torvi} torvea)");
        }

        /// <summary>KERTOJAN ALLA kuten KaupunkiAanetTestit.KertojanAllaKutenMuutPallonAanet: pahin tapaus mitatuista voimakkuuksista
        /// (kultaiset/pallo-soundly2-tasot-20261010.json); tapahtumat momentaarihuippu ≥ 6 dB ja taustat integroitu ≥ 10 dB alla.</summary>
        [Testi] static void KertojanAlla()
        {
            string Polku(string n) => System.IO.Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", n);
            var g = (Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna(System.IO.File.ReadAllText(Polku("pallo-soundly2-tasot-20261010.json")));
            var k = (Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna(System.IO.File.ReadAllText(Polku("pallo-aanitasot-20261008.json")));
            double L(Dictionary<string, object> d, string lahde, string kentta) => Convert.ToDouble(((Dictionary<string, object>)d[lahde])[kentta], System.Globalization.CultureInfo.InvariantCulture);
            double Db(double x) => 20 * Math.Log10(Math.Max(1e-9, x));
            double kertoja = L(k, "kertoja", "integroitu_lufs") + Db(OpasAanitasot.Kertoja(0.9)), ihm = 1 + IhmisAanet.Vaihtelu;
            var tapahtumat = new[] { ("lokki", PalloSoundly2Aanet.LokkiTaso), ("kyyhky_kujerrus", PalloSoundly2Aanet.KujerrusTaso), ("kyyhky_siivet", PalloSoundly2Aanet.SiivetTaso),
                ("tornikello_tunti", PalloSoundly2Aanet.TuntiTaso), ("tornikello_lyonti", PalloSoundly2Aanet.PuoliTaso), ("kirkonkello_soitto", PalloKaupunkiAanet.KirkkoTaso),
                ("raitiovaunu_kello", PalloSoundly2Aanet.RaitioKelloTaso), ("polkupyora_kello", IhmisAanet.KelloTaso * ihm), ("laivan_torvi_kaukana", PalloSoundly2Aanet.TorviKaukanaTaso),
                ("laivan_torvi_lahi", IhmisAanet.TorviTaso * ihm) };
            foreach (var (n, taso) in tapahtumat)
            {
                double m = kertoja - (L(g, n, "momentaari_max_lufs") + Db(OpasAanitasot.Maisema(taso, true)));
                Console.WriteLine($"      {n}: {m:F1} dB kertojan alla (tapahtuma, ≥ 6)");
                Oleta.Tosi(m >= 6, $"{n}: {m:F1} dB kertojan alla (≥ 6)");
            }
            double tm = kertoja - (L(g, "tuuli", "integroitu_lufs") + Db(OpasAanitasot.Maisema(PalloSoundly2Aanet.TuuliTaso, true)));
            Console.WriteLine($"      tuuli: {tm:F1} dB kertojan alla (tausta, ≥ 10)");
            Oleta.Tosi(tm >= 10, $"tuuli: {tm:F1} dB kertojan alla (≥ 10)");
        }

        [Testi] static void Deterministinen()
        {
            string Kulku(int siemen)
            {
                var sb = new System.Text.StringBuilder();
                var s = new Soundly2Aanet(siemen, Laiturit, Torit);
                for (double t = 0; t < 1200; t += Dt)
                {
                    double k = 15 + 10 * Math.Sin(t / 100);
                    s.Aloita(t, 30 * Math.Cos(t / 50), k, 30 * Math.Sin(t / 50), k); s.Valitse(Dt);
                    foreach (var e in s.Kerrat) sb.Append($"{t:F1}:{e.Tunnus}:{e.Taso:F4};");
                    if (Math.Abs(t % 10) < 1e-6) { var (kk, _) = s.OhiajonKello(t, 50); sb.Append(kk ?? "-"); }
                }
                return sb.ToString();
            }
            string a = Kulku(31), b = Kulku(31), c = Kulku(32);
            Oleta.Tosi(a.Length > 200 && a == b && a != c, "sama siemen → sama kulku, eri siemen → eri");
        }
    }
}
