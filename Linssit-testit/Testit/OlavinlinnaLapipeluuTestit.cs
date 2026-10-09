// OLAVINLINNAN LÄPIPELUUAJURI (Linssiseppä 8.10.2026, Päätoimittaja: koko peli 1–10 yhdellä testillä, juna 167; LS2:n huonesimulaatio
// ja M-osan ytimet, Siirtosepän Tyrma/Pako): yksi jatkuva maailma (Huonesimulaatio, PelattavaPala.Versio/Hash eli pelin oma data) alusta pakoon: huoneet 1–5 Thief-ajurilla
// (vartijat, harhautukset, tarjotin torkkujalle), kappelin valoarvoitus (KappelinArvoitus, sujuva järjestys), huone 6 (naamio
// naulakosta, kulho ja voudin kiista pöydällä pelaaja-57, avainrengas), huone 7 (muurikäytävän ovi avainrenkaalla, muurikäytävä),
// huone 8 (harja, köysikieppi, sakara, kiipeily otteilla), huone 9 (komero: tiilet ja kilvet, arkku), huone 10 (kello, köysilasku,
// kallio kävellen K4:lle, rannan vartijat esiin). Tulos yhdellä rivillä: läpi ja aika huoneittain, tai "JUMI huone N: …".
// Aika: Huonesimulaatio.T (kävely, odotukset, kiista, ovi, kallio) + paikattomat teot (kappeli, kiipeily, komero, köysilasku).
// Vertailu pelattavuusmalli-olavinlinna.md 9 (sujuva ja tutkiva min huoneittain); pelaaja-arvio = Σ max(simuloitu − kiinni, sujuva) + kiinni.
// Tyrmäajo: jokaisessa huoneessa, jossa kiinniottava vartija on 30 m:n päässä, pelaaja kävelee tahallaan kiinni huoneen lopussa,
// ratkaisee tyrmän (muunnelmat 1–3 vuorotellen), ja huone kuljetaan uudelleen tarkistuspisteestä; pakossa kiinni köysilaskussa.
// Kärsivällinen pelaaja: jos Thief-ajuri ei löydä reittiä, odotus lähimmässä piilossa 5 s kerrallaan (≤ 180 s) ennen JUMIa.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class OlavinlinnaLapipeluuTestit
    {
        const double Dt = Huonesimulaatio.Dt;
        /// <summary>pelattavuusmalli 9: huoneet 1…10 (min).</summary>
        static readonly double[] SujuvaMin = { 1, 2, 2.5, 1.5, 3.5, 3.5, 2, 3, 2, 1.5 }, TutkivaMin = { 1.5, 3, 4, 2.5, 5, 5, 3, 4, 3, 2 };
        /// <summary>Kappelin teon kesto (s; liike ja käsittely, ei pohdintaa) ja raapaisun kesto.</summary>
        const double KarsivallisyysS = 180, KappeliTekoS = 3, RaapaisuS = 2, KasitteleS = 2, KiistaMaxS = 60;

        static readonly KappeliTeko[] KappeliSujuva =
        {
            KappeliTeko.KohtausAlkoi, KappeliTeko.VoutiLahti, KappeliTeko.OviLukittu, KappeliTeko.LiekkiKilville, KappeliTeko.AvaaLuukku,
            KappeliTeko.LiekkiVetoon, KappeliTeko.KoputaOntto, KappeliTeko.AsetaKynttila, KappeliTeko.Raapaise, KappeliTeko.OtaKynttila,
            KappeliTeko.Puhalla, KappeliTeko.KappalainenLahti, KappeliTeko.SytytaOma, KappeliTeko.AsetaKynttila,
            KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise,
            KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise, KappeliTeko.Raapaise,
            KappeliTeko.AvaaNyytti, KappeliTeko.KalkkiAlttarille, KappeliTeko.PateeniAlttarille, KappeliTeko.LiuskekiviLaukkuun,
        };

        /// <summary>Läpipeluun tila: jatkuva maailma, paikattomien tekojen lisäaika, huoneiden ajat ja jumi.</summary>
        sealed class Ajo
        {
            public Huonesimulaatio W; public double Lisa; public string Jumi; public bool TyrmaAjo; public int Tyrmat, Muunnelma;
            /// <summary>Huone: simuloitu aika huoneittain; KiinniLisa: siitä kiinnijäännin osuus (virhe, tyrmä, uusi yritys).</summary>
            public readonly double[] Huone = new double[11], KiinniLisa = new double[11]; double alku;
            public readonly List<string> Loki = new List<string>();
            public double T => W.T + Lisa;
            public void Aloita() => alku = T;
            public void Valmis(int huone) { Huone[huone] += T - alku; alku = T; }
            public bool Kulje(int huone, int seuraava, int loppu)
            {
                if (Jumi != null) return false;
                // Kärsivällinen pelaaja: jos Thief-ajuri (odotus ≤ 42 s per piste) ei löydä reittiä, pelaaja odottaa viimeisessä
                // turvallisessa pisteessä (lähimmässä piilossa ≤ 6 m, muuten paikallaan) hiipien 5 s kerrallaan (enintään KarsivallisyysS)
                // ja yrittää uudelleen.
                var t = ThiefAjuri.Aja(W, seuraava, loppu, budjetti: 600); double odotettu = 0; var pisin = t;
                KavelyMerkki piilo = null; double pd = 6;
                if (t.Loppu == null) foreach (var m in Huonesimulaatio.Data.Lajia("piilo")) { double e = Huonesimulaatio.Etaisyys3(m.X, m.Y, m.Z, W.PX, W.PY, W.PZ); if (e < pd) { pd = e; piilo = m; } }
                while (t.Loppu == null && odotettu < KarsivallisyysS)
                {
                    int k0 = W.Kiinni;
                    if (piilo != null) for (int n = 0; n < 600 && !W.Askel((piilo.X, piilo.Y, piilo.Z), true); n++) { }
                    for (double x = 0; x < 5 - 1e-9; x += Dt) W.Odota(true); odotettu += 5;
                    if (W.Kiinni != k0) { Jumi = $"huone {huone}: kiinni odottaessa pisteessä pelaaja-{seuraava} ({odotettu:F0} s)"; return false; }
                    t = ThiefAjuri.Aja(W, seuraava, loppu, budjetti: 600); if (t.Pisin > pisin.Pisin) pisin = t;
                }
                if (t.Loppu == null) { Jumi = $"huone {huone}: Thief-ajuri jäi pisteeseen pelaaja-{pisin.Pisin + 1} (tavoite {loppu + 1}, odotettu {odotettu:F0} s)"; ThiefAjuri.Tulosta(pisin.PisinTila); return false; }
                W = t.Loppu; Loki.Add($"h{huone}: {(odotettu > 0 ? $"lisäodotus {odotettu:F0} s pelaaja-{seuraava}, " : "")}{string.Join(", ", t.Loki)}");
                return true;
            }
            public void OdotaS(double s, bool hiipii = false) { for (double t = 0; t < s - 1e-9; t += Dt) W.Odota(hiipii); }
            /// <summary>Tyrmäajossa huone kuljetaan ensin läpi, sitten kävellään suoraan lähimmän kiinniottavan vartijan luo, tyrmä
            /// ratkaistaan ja koko huone kuljetaan uudelleen tarkistuspisteestä (W.Seuraava); muuten tavallinen Kulje. Huonetta ei
            /// katkaista keskeltä, koska Thief-ajuri palaa tarvittaessa taaksepäin huoneen sisällä.</summary>
            public bool KuljeKiinni(int huone, int seuraava, int loppu)
            {
                if (!TyrmaAjo) return Kulje(huone, seuraava, loppu);
                int puoli = loppu;
                if (!Kulje(huone, seuraava, loppu)) return false;
                double t0 = T; var ennen = W.Kopioi(); bool naamio = W.Naamio; W.Naamio = false; int k0 = W.Kiinni;
                for (double t = 0; t < 90 && W.Kiinni == k0; t += Dt)
                {
                    Huonesimulaatio.Hahmo lahin = null; double d = 30;
                    foreach (var h in W.Hahmot) { if (!h.Aktiivinen || !h.Aivot.Profiili.Ottaa || !h.Aivot.Profiili.Havaitsee) continue; double e = Huonesimulaatio.Etaisyys3(h.X, h.Y, h.Z, W.PX, W.PY, W.PZ); if (e < d) { d = e; lahin = h; } }
                    if (lahin == null) break;
                    W.Askel((lahin.X, lahin.Y, lahin.Z), false);
                }
                W.Naamio = naamio;
                if (W.Kiinni == k0)
                {
                    // Huoneessa ei kiinniottajaa kävelymatkan päässä (keittiö: kokki ei ota kiinni) → jatketaan ilman tyrmää.
                    W = ennen; Loki.Add($"h{huone}: tyrmä ohitettu (ei kiinniottavaa vartijaa 30 m:n päässä pelaaja-{puoli + 1})");
                    return true;
                }
                double ty = Tyrmassa(Muunnelma++ % 3 + 1);
                if (ty < 0) { Jumi = $"huone {huone}: tyrmästä ei pääse ulos (muunnelma {(Muunnelma - 1) % 3 + 1})"; return false; }
                // Maailma jatkuu tyrmän ajan (valppaus 60 s laskee), pelaaja poissa näkyvistä: armo koko tyrmän ajaksi.
                W.ArmoAsti = W.T + ty + Huonesimulaatio.ArmoS; OdotaS(ty); Tyrmat++;
                // Uusi yritys tarkistuspisteestä: Thief-ajuri (ja kärsivällinen odotus piilossa) hoitaa valppaat vartijat.
                Loki.Add($"h{huone}: kiinni pelaaja-{puoli + 1}, tyrmä {ty:F0} s, uusi yritys pelaaja-{W.Seuraava}");
                bool ok = Kulje(huone, W.Seuraava, loppu); KiinniLisa[huone] += T - t0;
                return ok;
            }
        }

        /// <summary>Tyrmä (Siirtoseppä): 1 Pulu pudottaa avaimet → poimi, avaa; 2 vesipoika avaa; 3 irtokivi tutkimisen jälkeen.
        /// Palauttaa ajan ulos käytävälle (s) tai −1.</summary>
        static double Tyrmassa(int muunnelma)
        {
            const double KatseleS = 8, TekoS = 2, UlosS = 4;
            var t = new Tyrma(muunnelma); double edellinen = 0;
            while (t.Aika < 120 && t.Vaihe != TyrmanVaihe.OviAuki)
            {
                t.Paivita(Dt);
                if (t.Aika - edellinen < TekoS) continue;
                if (t.Vaihe == TyrmanVaihe.AvaimetOlissa && t.Poimi()) edellinen = t.Aika;
                else if (t.Vaihe == TyrmanVaihe.AvaimetKadessa && t.AvaaOvi()) edellinen = t.Aika;
                else if (muunnelma == 3 && t.Aika >= KatseleS && t.KiviIrti()) edellinen = t.Aika;
            }
            return t.Vaihe == TyrmanVaihe.OviAuki && t.Ulos() ? t.Aika + UlosS : -1;
        }

        /// <summary>Merkkiä lähin reittipiste (0-pohjainen reitti:pelaaja-indeksi): huoneen sisäiset kohdat datasta, ei kiinteinä.</summary>
        static int Lahin(string nimi)
        {
            var m = Merkki(nimi); int paras = 0; double pd = double.MaxValue;
            for (int i = 0; i < Huonesimulaatio.Reitti.Count; i++) { var q = Huonesimulaatio.Reitti[i]; double d = Huonesimulaatio.Etaisyys3(q.X, q.Y, q.Z, m.X, m.Y, m.Z); if (d < pd) { pd = d; paras = i; } }
            return paras;
        }

        static string Data => $"{PelattavaPala.Versio} ({PelattavaPala.Hash})";

        static KavelyMerkki Merkki(string nimi) { foreach (var m in Huonesimulaatio.Data.Merkit) if (m.Nimi == nimi) return m; throw new Exception(nimi + " puuttuu"); }
        static (double X, double Y, double Z) P(string nimi) { var m = Merkki(nimi); return (m.X, m.Y, m.Z); }

        /// <summary>Kurinalainen kiipeily (OlavinlinnaMOsaTestit.Kiipea): pysähtyy varoituksiin, lyhty yllä puolivälissä kerran.</summary>
        static (double Aika, bool Putosi, bool Havaittu) Kiipea(int otteita, IEnumerable<int> puuskat, IEnumerable<int> kapeat = null, IEnumerable<int> levot = null)
        {
            var k = new Kiipeily(otteita, puuskat, kapeat, levot); bool lyhty = false, putosi = false, havaittu = false; double t = 0;
            for (; t < 180 && !k.Perilla; t += Dt)
            {
                // Kapealla tarkka ote (pysähdys), lepo-otteella lepo voiman palautumiseen asti (LR v45y, PT 9.10.).
                bool lepo = k.Siirtyy == 0 && k.Lepo(k.Ote) && k.Voima < 0.95;
                int s = k.PuuskaVaroittaa || k.Puuska || k.LyhtyVaroittaa || k.LyhtyValaisee || k.Himmenee || k.KapeaOdottaa || lepo ? 0 : 1;
                k.Paivita(Dt, s);
                if (!lyhty && k.Ote >= otteita / 2 && k.Siirtyy == 0) { lyhty = true; k.LyhtyYlla(); }
                putosi |= k.Putosi; havaittu |= k.Havaittu;
            }
            return (k.Perilla ? t : -1, putosi, havaittu);
        }

        /// <summary>Koko peli varjoreittiä (kurinalainen pelaaja, ei kiinnijääntejä).</summary>
        static Ajo Pelaa(bool tyrma = false)
        {
            var a = new Ajo { W = Huonesimulaatio.Uusi(), TyrmaAjo = tyrma }; a.Aloita();
            // Huoneet 1–5 (reitti:pelaaja-1…20): laituri ja vesiportti, porttikäytävä ja piha, keittiö (tarjotin torkkujalle), kirkkotorni.
            // Huonerajat turvallisissa pisteissä: Thief-ajuri palaa tarvittaessa taaksepäin vain saman Kulje-kutsun sisällä (raja
            // pelaaja-9:n kohdalla jumitti keittiön, koska piilovalinta pihalla jäi edelliseen osaan).
            // Huonerajat LS2:n ThiefAjuri.Huoneet-taulukosta (pelattavuusmalli: 2 laituri ja porttikäytävä, 3 piha ja keittiö,
            // 4 kirkkotorni ja portaat, 6 Linnantupa ja voudin sali, 7 muurikäytävä, 8 harja).
            var H = ThiefAjuri.Huoneet;
            if (!a.KuljeKiinni(2, H[2].Alku + 1, H[2].Loppu)) return a; a.Valmis(2);
            if (!a.KuljeKiinni(3, H[3].Alku + 1, H[3].Loppu)) return a; a.Valmis(3);
            if (!a.KuljeKiinni(4, H[4].Alku + 1, H[4].Loppu)) return a; a.Valmis(4);
            if (!a.W.Annettu) { a.Jumi = "huone 4: tarjotin jäi antamatta torkkujalle"; return a; }
            // Huone 5: kappelin valoarvoitus (vaiheet 1–12), kynttilä puhalletaan arvoituksessa.
            var kap = new KappelinArvoitus();
            foreach (var t in KappeliSujuva)
            {
                if (!kap.Teko(t)) { a.Jumi = $"huone 5: kappeli ei hyväksy tekoa {t} (vaihe {kap.Vaihe})"; return a; }
                if (t == KappeliTeko.Raapaise && kap.KappalainenTulee) kap.KappalainenTulee = false;
                double s = t == KappeliTeko.Raapaise ? RaapaisuS : KappeliTekoS; kap.Paivita(s); a.Lisa += s;
            }
            if (kap.Vaihe != KappelinArvoitus.Valmis) { a.Jumi = $"huone 5: kappeli vaiheessa {kap.Vaihe}"; return a; }
            a.W.Kynttila = false; a.Valmis(5);
            // Huone 6: kaari-ovi → naamio naulakosta → Linnantupa → voudin pöytä (pelaaja-57): kulho, kiista, avainrengas → paluu.
            int kiistaPiste = Lahin("esine:kulho-poydalle"), oviPiste = Lahin("ovi:muurikaytava");
            if (!a.KuljeKiinni(6, H[6].Alku + 1, kiistaPiste)) return a;
            if (!a.W.Naamio) { a.Jumi = "huone 6: naamio jäi ottamatta naulakosta"; return a; }
            var kiista = new VoudinKiista(); var kulho = Merkki("esine:kulho-poydalle"); var vouti = Merkki("istuu:vouti");
            if (!kiista.KulhoLaskettu(Huonesimulaatio.Etaisyys2(a.W.PX, a.W.PZ, kulho.X, kulho.Z))) { a.Jumi = "huone 6: kulho ei ulotu pöydän merkistä"; return a; }
            double yaw = vouti.KiertoY.Value * 180 / Math.PI, kiistaS = 0; int k0 = a.W.Kiinni;
            for (; kiistaS < KiistaMaxS && !kiista.SaaOttaa(a.W.PX - vouti.X, a.W.PZ - vouti.Z, yaw); kiistaS += Dt) { a.W.Odota(false); kiista.Paivita(Dt); }
            if (kiistaS >= KiistaMaxS || a.W.Kiinni != k0) { a.Jumi = $"huone 6: avainrengas ei irronnut ({kiistaS:F0} s, kiinni {a.W.Kiinni - k0})"; return a; }
            a.OdotaS(1);   // otto
            a.Loki.Add($"h6: avainrengas {kiistaS:F1} s kulhosta");
            if (!a.Kulje(6, kiistaPiste + 1, H[6].Loppu)) return a; a.Valmis(6);
            // Huone 7: Tott-kammio → muuriportaat → ampumakäytävä → muurikäytävän ovi (avainrengas) → muurikäytävä.
            if (!a.KuljeKiinni(7, H[7].Alku + 1, oviPiste - 1)) return a;
            if (LukittuOvi.Avaa(true, "avainrengas", new[] { "avainrengas" }, false) == OviTulos.Lukossa) { a.Jumi = "huone 7: ovi ei aukea avainrenkaalla"; return a; }
            a.OdotaS(KasitteleS, true);
            if (!a.Kulje(7, oviPiste, H[7].Loppu)) return a; a.Valmis(7);
            // Huone 8: tikkaat, harja, köysikieppi (pelaaja-89), sakara (-91), kiipeily kellotornin ympäri.
            if (!a.Kulje(8, H[8].Alku + 1, H[8].Loppu)) return a;
            a.OdotaS(2 * KasitteleS, true);   // köysikieppi + kiinnitys sakaraan
            var otteet = new List<(double X, double Y, double Z)>();
            for (int i = 1; ; i++) { KavelyMerkki m = Huonesimulaatio.Data.Merkit.FirstOrDefault(x => x.Nimi == "ote:kellotorni-" + i); if (m == null) break; otteet.Add((m.X, m.Y, m.Z)); }
            var puuskat = new List<int>(); var kapeat = new List<int>(); var levot = new List<int>();
            foreach (var m in Huonesimulaatio.Data.Lajia("tuuli")) for (int i = 0; i < otteet.Count; i++) if (Huonesimulaatio.Etaisyys3(m.X, m.Y, m.Z, otteet[i].X, otteet[i].Y, otteet[i].Z) < 0.5) puuskat.Add(i);
            for (int i = 0; i < otteet.Count; i++) { var om = Merkki("ote:kellotorni-" + (i + 1)); if (om.Kapea) kapeat.Add(i); if (om.Tyyppi == "lepo") levot.Add(i); }
            var (kiipeily, putosi, havaittu) = Kiipea(otteet.Count, puuskat, kapeat, levot);
            if (kiipeily < 0 || putosi || havaittu) { a.Jumi = $"huone 8: kiipeily ({otteet.Count} otetta) ei mennyt läpi (putosi {putosi}, havaittu {havaittu})"; return a; }
            a.Lisa += kiipeily; a.Valmis(8);
            // Huone 9: komero (tiilet hitaasti, kilvet 3 × 15°), arkku auki.
            var komero = new Komero();
            for (int i = 0; i < komero.Tiilet.Maara; i++) { komero.Raavi(i); komero.Raavi(i, 0); komero.Tiilet.Paivita(3); a.Lisa += 3; }
            for (int i = 0; i < 3; i++) { komero.KaannaKilpea(1); komero.KaannaKilpea(2); a.Lisa += 2; }
            if (komero.Avaa() != KilpiTulos.Auki) { a.Jumi = "huone 9: arkku ei aukea (kilvet tai tiilet)"; return a; }
            (a.W.PX, a.W.PY, a.W.PZ) = Huonesimulaatio.Reitti[92]; a.Valmis(9);
            // Huone 10: kello, köysi kramppiin, köysilasku, kallio kävellen K4:lle (rannan vartijat esiin kellosta).
            var pako = new Pako(); pako.ArkkuAuki(); pako.Paivita(0.5, false); a.Lisa += 0.5;
            if (!pako.Kiinnita()) { a.Jumi = "huone 10: köysi ei kiinnity kramppiin"; return a; }
            var krampi = P("koysi:krampi-komero"); var p1 = P("reitti:pako-1");
            int laskuOtteita = (int)Math.Ceiling(Huonesimulaatio.Etaisyys3(krampi.X, krampi.Y, krampi.Z, p1.X, p1.Y + 1.55, p1.Z)) + 1;
            var (lasku, lPutosi, lHavaittu) = Kiipea(laskuOtteita, null);
            if (lasku < 0 || lPutosi || lHavaittu) { a.Jumi = $"huone 10: köysilasku ({laskuOtteita} otetta) ei mennyt läpi"; return a; }
            if (tyrma)
            {
                // Kiinni köysilaskun puolivälissä (soihtu alhaalla): tyrmä → T10a laskun alku, köysi uudelleen kramppiin.
                pako.Paivita(lasku / 2, false); a.Lisa += lasku / 2;
                if (!pako.Kiinni()) { a.Jumi = "huone 10: kiinnijäänti köysilaskussa ei palauta laskun alkuun"; return a; }
                double ty = Tyrmassa(a.Muunnelma++ % 3 + 1);
                if (ty < 0) { a.Jumi = "huone 10: tyrmästä ei pääse ulos"; return a; }
                a.Lisa += ty; a.Tyrmat++; a.Loki.Add($"h10: kiinni köysilaskussa, tyrmä {ty:F0} s, uusi lasku"); a.KiinniLisa[10] += lasku / 2 + ty + lasku;
                if (!pako.Kiinnita()) { a.Jumi = "huone 10: köysi ei kiinnity uudelleen tyrmän jälkeen"; return a; }
            }
            pako.Paivita(lasku, false); pako.LaskuValmis(); a.Lisa += lasku;
            (a.W.PX, a.W.PY, a.W.PZ) = p1; a.W.Naamio = false;
            var k4 = P("kamera:K4"); int kk = a.W.Kiinni;
            for (int n = 2; n <= 5 && pako.Vaihe == PakoVaihe.Kallio; n++)
            {
                var q = P("reitti:pako-" + n);
                for (int i = 0; i < 3000 && pako.Vaihe == PakoVaihe.Kallio; i++)
                {
                    bool perilla = a.W.Askel(q, false);
                    pako.Paivita(Dt, Huonesimulaatio.Etaisyys2(a.W.PX, a.W.PZ, k4.X, k4.Z) < 2.5);
                    if (pako.RantaEsiin) { pako.RantaEsiin = false; a.W.Aktivoi("ranta"); }
                    if (perilla) break;
                }
            }
            if (pako.Vaihe != PakoVaihe.K4 || pako.Myohastynyt || a.W.Kiinni != kk) { a.Jumi = $"huone 10: pako ei päättynyt K4:ään ({pako.Vaihe}, myöhästyi {pako.Myohastynyt}, kiinni {a.W.Kiinni - kk})"; return a; }
            a.Valmis(10);
            return a;
        }

        static string Mmss(double s) => $"{(int)(s / 60)}:{(int)(s % 60):00}";

        static string Rivi(Ajo a)
        {
            // Pelaaja-arvio: huone kestää vähintään suunnitelman sujuvan ajan (lukeminen, katselu, pohdinta ei ole simulaatiossa),
            // ja kiinnijäännin hinta (kävely vartijalle, tyrmä, uusi yritys) tulee päälle simuloituna.
            var huoneet = new List<string>(); double arvio = 0, kiinni = 0;
            for (int h = 2; h <= 10; h++)
            {
                double sujuva = (h == 2 ? SujuvaMin[0] + SujuvaMin[1] : SujuvaMin[h - 1]) * 60;
                huoneet.Add($"{(h == 2 ? "1–2" : h.ToString())} {Mmss(a.Huone[h])}");
                arvio += Math.Max(a.Huone[h] - a.KiinniLisa[h], sujuva) + a.KiinniLisa[h]; kiinni += a.KiinniLisa[h];
            }
            return $"läpi {Mmss(a.T)} simuloitua, pelaaja-arvio {Mmss(Arvio(a))} (kiinnijäänneistä {Mmss(kiinni)}; suunnitelma sujuva 22:30, tutkiva 33:00), "
                + $"kiinni {a.W.Kiinni + (a.TyrmaAjo ? 1 : 0)}, tyrmä {a.Tyrmat} | {string.Join(" · ", huoneet)}";
        }

        static double Arvio(Ajo a)
        {
            double arvio = 0;
            for (int h = 2; h <= 10; h++) arvio += Math.Max(a.Huone[h] - a.KiinniLisa[h], (h == 2 ? SujuvaMin[0] + SujuvaMin[1] : SujuvaMin[h - 1]) * 60) + a.KiinniLisa[h];
            return arvio;
        }

        [Testi] static void KokoPeliVarjoreittiaLapi()
        {
            var a = Pelaa();
            if (a.Jumi != null) Console.WriteLine($"      LÄPIPELUU {Data}: JUMI {a.Jumi}");
            else Console.WriteLine($"      LÄPIPELUU {Data}: {Rivi(a)}");
            Oleta.Tosi(a.Jumi == null, $"JUMI {a.Jumi}");
            Oleta.Sama(0, a.W.Kiinni);
            for (int h = 3; h <= 10; h++) Oleta.Tosi(a.Huone[h] <= TutkivaMin[h - 1] * 60, $"huone {h}: simuloitu {Mmss(a.Huone[h])} ≤ tutkiva {TutkivaMin[h - 1]} min");
        }

        [Testi] static void KokoPeliTyrmineenJaUusinYrityksin()
        {
            var a = Pelaa(tyrma: true);
            if (a.Jumi != null) Console.WriteLine($"      LÄPIPELUU {Data} + tyrmät: JUMI {a.Jumi}");
            else Console.WriteLine($"      LÄPIPELUU {Data} + tyrmät: {Rivi(a)}");
            Console.WriteLine("        " + string.Join(" · ", a.Loki.Where(l => l.Contains("tyrmä"))));
            Oleta.Tosi(a.Jumi == null, $"JUMI {a.Jumi}");
            Oleta.Tosi(a.Tyrmat >= 5, $"tyrmiä {a.Tyrmat} ≥ 5");
            // Tavoite noin 25–35 min (Päätoimittaja): sujuva 22:30 + kiinnijääntien hinta (tyrmä, uusi yritys) vähintään 1 min, enintään 35 min.
            Oleta.Tosi(Arvio(a) >= (22.5 + 1) * 60 && Arvio(a) <= 35 * 60, $"pelaaja-arvio {Mmss(Arvio(a))} välillä 23:30–35:00");
        }
    }
}
