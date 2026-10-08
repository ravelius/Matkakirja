// HISTORIAMOOTTORI (Siirtoseppä 7.10.2026): pelattavuusmalli kohta 11 — huonesimulaatio ilman Unityä. Ydin-luokat (Vartija, Askelaani,
// KavelyData) ajetaan Olavinlinnan PelattavaPala.Versio-datalla (kultaiset/olavinlinna-<Versio>-*.json): partiot, torkkuja, pinnat, osat. Näkölinja
// yksinkertaistettuna: sama tai naapuriosa ja kerrosero alle 2 m (seinät osien rajoista). Testiajuri hiipii reitti:pelaaja-N -merkit
// odottaen, ettei vartija ole 5 m:n sisällä seuraavasta pisteestä (pimeä, valoisuus 0,25), tai kävelee valossa (1,0).
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class HuonesimulaatioTestit
    {
        sealed class Simuvartija { public Vartija Aivot; public double X, Y, Z; public List<(double X, double Y, double Z)> Pisteet = new List<(double, double, double)>(); }

        static KavelyData Data()
        {
            string Lue(string n) => File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", n));
            return KavelyData.Lue(Lue("olavinlinna-" + PelattavaPala.Versio + "-osat.json"), Lue("olavinlinna-" + PelattavaPala.Versio + "-merkit.json"));
        }

        static List<Simuvartija> Vartijat(KavelyData d)
        {
            var reitit = new SortedDictionary<string, List<KavelyMerkki>>(StringComparer.Ordinal);
            foreach (var m in d.Lajia("istuu")) if (m.Profiili != null) reitit["istuu-" + m.Tunnus] = new List<KavelyMerkki> { m };
            foreach (var m in d.Lajia("partio"))
            {
                int vi = m.Tunnus.LastIndexOf('-');
                string nimi = vi > 0 ? m.Tunnus.Substring(0, vi) : m.Tunnus;
                if (!reitit.TryGetValue(nimi, out var l)) reitit[nimi] = l = new List<KavelyMerkki>();
                l.Add(m);
            }
            var ulos = new List<Simuvartija>();
            foreach (var kv in reitit)
            {
                var eka = kv.Value[0]; bool istuu = eka.Laji == "istuu";
                var p = new List<(double, double, double)>();
                foreach (var m in kv.Value) p.Add((m.X, m.Z, istuu ? 1e9 : m.OdotaS > 0 ? m.OdotaS : 2.0));
                var v = new Simuvartija { Aivot = new Vartija(p, eka.KiertoY is double k ? k * 180 / Math.PI : 0) { Profiili = VartijaProfiili.Hae(eka.Profiili), Torkkuu = istuu }, X = eka.X, Y = eka.Y, Z = eka.Z };
                foreach (var m in kv.Value) v.Pisteet.Add((m.X, m.Y, m.Z));
                foreach (var pm in d.Lajia("piilo")) v.Aivot.Piilot.Add((pm.X, pm.Z));
                ulos.Add(v);
            }
            return ulos;
        }

        static List<(double X, double Y, double Z)> PelaajanReitti(KavelyData d)
        {
            var r = new SortedDictionary<int, (double, double, double)>();
            foreach (var m in d.Lajia("reitti")) if (m.Tunnus.StartsWith("pelaaja-", StringComparison.Ordinal) && int.TryParse(m.Tunnus.Substring(8), out int n)) r[n] = (m.X, m.Y, m.Z);
            return new List<(double, double, double)>(r.Values);
        }

        static bool Nakyy(KavelyData d, Simuvartija v, double px, double py, double pz)
        {
            if (Math.Abs(v.Y - py) > 2) return false;
            string a = Askelaani.Osa(d, v.X, v.Y, v.Z), b = Askelaani.Osa(d, px, py, pz);
            return Askelaani.Kuuluvuus(d, 1, a, b) > 0;
        }

        /// <summary>Ajaa reitin; palauttaa (kiinnijäämiset, aika s, varoitukset ennen kiinniottoa kunnossa).</summary>
        static (int Kiinni, double Aika, bool Varoitettu, double Sujuva) Aja(bool valossa, double maxS, int pisteita = int.MaxValue, bool tarjottimella = false)
        {
            bool tarjotin = false, annettu = false; double armo = 0;
            var d = Data(); var vartijat = Vartijat(d); var reitti = PelaajanReitti(d);
            int kaikki = reitti.Count;
            if (reitti.Count > pisteita) reitti.RemoveRange(pisteita, reitti.Count - pisteita);
            Oleta.Tosi(kaikki >= 20 && vartijat.Count >= 5, $"data: reitti {kaikki}, vartijat {vartijat.Count}");
            double px = reitti[0].X, py = reitti[0].Y, pz = reitti[0].Z, t = 0, sujuva = 0; int i = 1, kiinni = 0; bool varoitettu = true;
            for (int k = 1; k < reitti.Count; k++) { double dx = reitti[k].X - reitti[k - 1].X, dz = reitti[k].Z - reitti[k - 1].Z; sujuva += Math.Sqrt(dx * dx + dz * dz); }
            double nopeus = valossa ? Kavely.KavelyMs : Kavely.HiipiminenMs; sujuva /= nopeus;
            double hiipien = nopeus;
            const double dt = 1 / 30.0; double riitaAjastin = 20, heitetty = -99;
            while (i < reitti.Count && t < maxS)
            {
                // Riidan ikkuna huoneessa 2 (sovitin: soutaja-2 → riita), 40 s:n välein, kohti venettä (vene:laituri).
                if ((riitaAjastin -= dt) <= 0) { riitaAjastin = 40; foreach (var v in vartijat) if (v.Aivot.Profiili == VartijaProfiili.Portinvartija) v.Aivot.AloitaRiita(-63.09, 28.1); }
                var q = reitti[i];
                // Ajuri odottaa pimeässä, kunnes kukaan valveilla oleva ei ole 5 m:n sisällä seuraavasta pisteestä tai pelaajasta.
                bool odota = false;
                if (!valossa)
                    foreach (var v in vartijat)
                    {
                        if (v.Aivot.Torkkuu || !v.Aivot.Profiili.Havaitsee || v.Aivot.Riita > 2 || Math.Abs(v.Y - q.Y) > 2) continue;
                        if (tarjotin && v.Aivot.Profiili.TarjotinLupa) continue;   // kulkulupa: vartijat eivät epäile kävelijää
                        // Uhka: seuraava piste tai pelaaja vartijan edessä (±70°) alle 4,5 m:ssä, tai vartija jo epäilee lähellä.
                        bool Edessa(double x, double z) { double dx = x - v.X, dz = z - v.Z; double e = Math.Abs(((Math.Atan2(dx, dz) * 180 / Math.PI - v.Aivot.Yaw) % 360 + 540) % 360 - 180); return Math.Sqrt(dx * dx + dz * dz) < 4.5 && (e < 70 || dx * dx + dz * dz < 2.25); }
                        if (Edessa(q.X, q.Z) || Edessa(px, pz) || v.Aivot.Mittari > 0.2 && Math.Sqrt((v.X - px) * (v.X - px) + (v.Z - pz) * (v.Z - pz)) < 5) odota = true;
                    }
                // Harhautus (kohta 8.1 huone 3): odotettaessa heitetään saman osan kaukaisin heitettävä (kolahdus 12 m) kerran 15 s:ssa.
                List<Aanilahde> harhautus = null;
                if (odota && !valossa && t - heitetty > 15)
                {
                    string qosa = Askelaani.Osa(d, q.X, q.Y, q.Z); KavelyMerkki kauko = null; double kd2 = 0;
                    foreach (var m in d.Lajia("esine"))
                        if (m.Heitettava && Askelaani.Osa(d, m.X, m.Y, m.Z) == qosa) { double e = (m.X - q.X) * (m.X - q.X) + (m.Z - q.Z) * (m.Z - q.Z); if (e > kd2) { kd2 = e; kauko = m; } }
                    if (kauko != null) { harhautus = new List<Aanilahde> { new Aanilahde(kauko.X, kauko.Z, 12, qosa) }; heitetty = t; }
                }
                double vauhti = 0;
                // Väistö: valveilla oleva vartija (ei kulkulupaa) tulee kohti alle 3 m:ssä → pelaaja perääntyy edelliseen pisteeseen.
                bool vaisto = false;
                if (!valossa && i > 1)
                    foreach (var v in vartijat)
                    {
                        if (v.Aivot.Torkkuu || !v.Aivot.Profiili.Havaitsee || v.Aivot.Riita > 0 || tarjotin && v.Aivot.Profiili.TarjotinLupa || Math.Abs(v.Y - py) > 2) continue;
                        double dx = px - v.X, dz = pz - v.Z; double e = Math.Abs(((Math.Atan2(dx, dz) * 180 / Math.PI - v.Aivot.Yaw) % 360 + 540) % 360 - 180);
                        if (dx * dx + dz * dz < 9 && e < 90) vaisto = true;
                    }
                if (vaisto)
                {
                    var r0 = reitti[i - 1]; var r1 = reitti[Math.Max(0, i - 2)];
                    var kohde = (r0.X - px) * (r0.X - px) + (r0.Z - pz) * (r0.Z - pz) < 0.04 ? r1 : r0;
                    double dx = kohde.X - px, dz = kohde.Z - pz, dd = Math.Sqrt(dx * dx + dz * dz);
                    if (dd > 0.05) { double a = Math.Min(dd, hiipien * dt); px += dx / dd * a; pz += dz / dd * a; vauhti = hiipien; }
                    if (dd < 0.1 && kohde.Equals(r1) && i > 1) i--;
                    odota = true;
                }
                if (!odota)
                {
                    double dx = q.X - px, dz = q.Z - pz, dd = Math.Sqrt(dx * dx + dz * dz);
                    if (dd < 0.1)
                    {
                        py = q.Y; i++;
                        // Ajuri: tarjotin pöydältä (lähin piste esine:tarjottimeen) ja eväät torkkuvalle vartijalle (alle 1,6 m).
                        if (tarjottimella && !tarjotin && !annettu) foreach (var m in d.Lajia("esine")) if (m.Kannettava && (m.X - px) * (m.X - px) + (m.Z - pz) * (m.Z - pz) < 1.6 * 1.6) tarjotin = true;
                        if (tarjotin) foreach (var v in vartijat) if (v.Aivot.Profiili == VartijaProfiili.Torkku && v.Aivot.Torkkuu && (v.X - px) * (v.X - px) + (v.Z - pz) * (v.Z - pz) < 1.6 * 1.6 && Math.Abs(v.Y - py) < 2) { v.Aivot.Syo = true; tarjotin = false; annettu = true; }
                        continue;
                    }
                    nopeus = tarjotin ? Kavely.KavelyMs : hiipien;   // tarjotin kädessä kävellään (kyyristely epäilyttää)
                    double askel = Math.Min(dd, nopeus * dt); px += dx / dd * askel; pz += dz / dd * askel; py += (q.Y - py) * askel / dd; vauhti = nopeus;
                }
                double sade = vauhti > 0 ? Askelaani.Sade(Askelaani.Pinta(d, px, py, pz), valossa || tarjotin ? Liiketapa.Kavely : Liiketapa.Hiipiminen) : 0;
                string posa = Askelaani.Osa(d, px, py, pz);
                foreach (var v in vartijat)
                {
                    var aanet = new List<Aanilahde>();
                    if (harhautus != null) foreach (var h in harhautus) { double r = Askelaani.Kuuluvuus(d, h.KuuluvuusM, h.Osa, Askelaani.Osa(d, v.X, v.Y, v.Z)); if (r > 0) aanet.Add(new Aanilahde(h.X, h.Z, r)); }
                    if (sade > 0) { double r = Askelaani.Kuuluvuus(d, sade, posa, Askelaani.Osa(d, v.X, v.Y, v.Z)); if (r > 0 && Math.Abs(v.Y - py) < 3) aanet.Add(new Aanilahde(px, pz, r)); }
                    var s = new VartijanSyote { VartijaX = v.X, VartijaZ = v.Z, PelaajaX = px, PelaajaZ = pz, NakolinjaVapaa = Nakyy(d, v, px, py, pz), Piilossa = armo > 0, Valoisuus = valossa ? 1.0 : 0.25, Hiipii = !valossa && !tarjotin, PelaajaVauhti = vauhti, Aanet = aanet, Tarjotin = tarjotin };
                    v.Aivot.Paivita(dt, s);
                    if (v.Aivot.Tila == VartijanTila.Kiinni)
                    {
                        kiinni++; if (!v.Aivot.Varoitettu) varoitettu = false;
                        px = reitti[Math.Max(0, i - 1)].X; py = reitti[Math.Max(0, i - 1)].Y; pz = reitti[Math.Max(0, i - 1)].Z;   // tarkistuspisteeseen
                        armo = 4;
                        foreach (var w in vartijat) w.Aivot.Nollaa(w.X, w.Z, valpas: true);
                        break;
                    }
                    double kx = v.Aivot.KohdeX - v.X, kz = v.Aivot.KohdeZ - v.Z, kd = Math.Sqrt(kx * kx + kz * kz);
                    if (kd > 1e-6 && v.Aivot.Vauhti > 0)
                    {
                        double a = Math.Min(kd, v.Aivot.Vauhti * dt); v.X += kx / kd * a; v.Z += kz / kd * a; v.Aivot.Yaw = Math.Atan2(kx, kz) * 180 / Math.PI;
                        double pd = double.MaxValue; foreach (var p in v.Pisteet) { double e = (p.X - v.X) * (p.X - v.X) + (p.Z - v.Z) * (p.Z - v.Z); if (e < pd) { pd = e; v.Y = p.Y; } }
                    }
                }
                if (kiinni > 0 && valossa) break;
                t += dt; armo -= dt;
            }
            if (i < reitti.Count) { Console.WriteLine($"      jumissa pisteessä {i + 1} ({px:F1}, {py:F1}, {pz:F1})"); foreach (var v in vartijat) Console.WriteLine($"        {v.Aivot.Profiili.Nimi} ({v.X:F1}, {v.Y:F1}, {v.Z:F1}) {v.Aivot.Tila} torkkuu {v.Aivot.Torkkuu} mittari {v.Aivot.Mittari:F2}"); }
            return (kiinni, i >= reitti.Count ? t : double.PositiveInfinity, varoitettu, sujuva);
        }

        // Varjoreitti ja koko pala 1–5: OlavinlinnaPalaTestit (LS2 8.10., Thief-ajuri odottaa piilossa). Vanha 8 pisteen suora ajuri
        // poistettu: odotus_s-kenttä (LS2:n löydös 1) pidensi partioiden odotukset, eikä odottamaton ajuri ole pelaajan malli.

        [Testi] static void ValoreittiKiinniVaroituksen()
        {
            var (kiinni, _, varoitettu, _) = Aja(valossa: true, maxS: 300);
            Oleta.Tosi(kiinni >= 1 && varoitettu, $"valoreitti: kiinni {kiinni}, varoitus ennen {varoitettu}");
        }
    }
}
