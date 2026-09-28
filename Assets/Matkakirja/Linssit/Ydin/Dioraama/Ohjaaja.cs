// DIORAAMAN OHJAAJA — puhdas logiikka (speksi docs/raportit/dioraama-rajapinnat-20260929.md kohta 4).
// JS-pari: js/dioraama/ohjaaja.js. Pariteettia vartioidaan Linssit-testit/kultaiset/dioraama-vektorit.json:lla.
// smootherstep tuodaan Kameraliikkeestä — sama käyrä, yksi lähde.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit.Dioraama
{
    /// <summary>Käsikirjoituksen tila hetkellä t (Ohjaaja.KasikirjoitusHetkella-metodin paluuarvo).</summary>
    public readonly struct KasikirjoitusTila
    {
        public readonly int Indeksi;
        public readonly double Alku, Paikallinen;
        public readonly bool Valmis;
        public KasikirjoitusTila(int indeksi, double alku, double paikallinen, bool valmis)
        { Indeksi = indeksi; Alku = alku; Paikallinen = paikallinen; Valmis = valmis; }
    }

    public static class Ohjaaja
    {
        /// <summary>
        /// AskeleenKesto(askel, tila, rak) → sekuntia. pulu-lenna 1,8; taulu 0,25; kohta = max(3, 0,06·merkit)
        /// tilan taulun Kohdat[N]:n tekstistä; repliikki/reaktio = max(2, 0,06·merkit) hahmon tekstistä; odota =
        /// askel.S. Kun rivillä on ääni (Aani ei tyhjä), kesto tulee äänestä: rak.Aanet[Aani].KestoS korvaa
        /// tekstipohjaisen arvion kokonaan.
        ///
        /// TULKINTA (merkkien lähde 'repliikki'-askeleessa, vahvistettu tests/fixtures/dioraama/vektorit.json
        /// "tulkinnat"): Askel yksilöi vain hahmon, ei rivi-indeksiä, vaikka hahmolla voi olla useampi repliikki.
        /// Käytetään AINA hahmo.Repliikit[0] (ensimmäinen rivi). 'reaktio' on yksiselitteinen (Hahmo.Reaktio).
        /// TULKINTA (merkit = Teksti.Length, UTF-16-yksiköt, sama kuin JS:n teksti.length).
        /// </summary>
        public static double AskeleenKesto(Askel askel, Tila tila, Rakennus rak)
        {
            switch (askel.Tee)
            {
                case "pulu-lenna":
                    return 1.8;
                case "taulu":
                    return 0.25;
                case "kohta":
                {
                    var kohta = tila.Taulu.Kohdat[askel.N];
                    return Math.Max(3, 0.06 * kohta.Teksti.Length);
                }
                case "repliikki":
                case "reaktio":
                {
                    var hahmo = tila.Hahmot.FirstOrDefault(h => h.Id == askel.HahmoId);
                    var rivi = askel.Tee == "reaktio" ? hahmo.Reaktio : hahmo.Repliikit[0];
                    if (!string.IsNullOrEmpty(rivi.Aani) && rak.Aanet.TryGetValue(rivi.Aani, out var aani)) return aani.KestoS;
                    return Math.Max(2, 0.06 * rivi.Teksti.Length);
                }
                case "odota":
                    return askel.S;
                default:
                    throw new ArgumentException($"ohjaaja: tuntematon askel.tee \"{askel.Tee}\"");
            }
        }

        /// <summary>
        /// KasikirjoitusHetkella(kestot, napautukset, t) → { indeksi, alku, paikallinen, valmis }. kestot[i] on
        /// askeleen i luonnollinen kesto (AskeleenKesto etukäteen laskettuna joka askeleelle). Napautus päättää
        /// MENEILLÄÄN OLEVAN askeleen napautushetkellä: jos napautus osuu askeleen luonnolliseen ikkunaan
        /// [alku, luonnollinenLoppu), askel loppuu napautushetkellä ja seuraava alkaa siitä. TULKINTA: napautukset
        /// kulutetaan aikajärjestyksessä yksi kerrallaan — jos kaksi napautusta osuisi samaan alkuperäiseen
        /// ikkunaan, vain ensimmäinen vaikuttaa, koska askel on tuolloin jo päättynyt kun seuraava tulisi
        /// käsittelyyn.
        ///
        /// TULKINTA (askeleet-parametri): speksin kohdan 4 teksti listaa myös askeleet-parametrin, mutta kohdan 5
        /// C#-allekirjoitus ei sisällä sitä (vain kestot, napautukset, t) — funktio ei käytä askeleiden sisältöä,
        /// vain kestot.Count ratkaisee askelmäärän (vahvistettu vektoritiedoston "tulkinnat").
        /// </summary>
        public static KasikirjoitusTila KasikirjoitusHetkella(IReadOnlyList<double> kestot, IReadOnlyList<double> napautukset, double t)
        {
            if (kestot == null || kestot.Count == 0) return new KasikirjoitusTila(-1, 0, 0, true);
            var napit = napautukset == null ? Array.Empty<double>() : napautukset.ToArray();
            Array.Sort(napit);
            int napIdx = 0;
            double alku = 0;
            for (int i = 0; i < kestot.Count; i++)
            {
                double loppu = alku + kestot[i];
                if (napIdx < napit.Length && napit[napIdx] >= alku && napit[napIdx] < loppu)
                {
                    loppu = napit[napIdx];
                    napIdx++;
                }
                bool viimeinen = i == kestot.Count - 1;
                if (t < loppu || viimeinen)
                    return new KasikirjoitusTila(i, alku, t - alku, viimeinen && t >= loppu);
                alku = loppu;
            }
            // Ei pitäisi tulla tänne asti (silmukka palauttaa aina viimeisellä askeleella iässä i = count-1).
            return new KasikirjoitusTila(kestot.Count - 1, alku, t - alku, true);
        }

        /// <summary>
        /// PuluLento(alku, loppu, t01) → piste. Toisen asteen Bézier: P0 = alku, P1 = keskipiste + (0, 0,3·|Δ| + 1, 0)
        /// (huippu), P2 = loppu, parametri s = Smootherstep(t01). TULKINTA (nollamatka): jos alku == loppu, |Δ| = 0
        /// ja huippu on silti keskipiste + (0,1,0) — nostotermin vakio-osa +1 ei koskaan häviä.
        /// </summary>
        public static V3 PuluLento(V3 alku, V3 loppu, double t01)
        {
            double d = (loppu - alku).Pituus;
            var keski = new V3((alku.X + loppu.X) / 2, (alku.Y + loppu.Y) / 2, (alku.Z + loppu.Z) / 2);
            var huippu = new V3(keski.X, keski.Y + 0.3 * d + 1, keski.Z);
            double s = Kameraliike.Smootherstep(t01);
            double inv = 1 - s;
            double p0 = inv * inv, p1 = 2 * inv * s, p2 = s * s;
            return new V3(
                p0 * alku.X + p1 * huippu.X + p2 * loppu.X,
                p0 * alku.Y + p1 * huippu.Y + p2 * loppu.Y,
                p0 * alku.Z + p1 * huippu.Z + p2 * loppu.Z);
        }
    }
}
