// HISTORIAMOOTTORI: TYRMÄN ÄÄNIYMPÄRISTÖ (Pelikoodari 11.10.2026; PT:n Olavinlinna-yösuunnitelma B3, Laitetestaajan TF 180 -raportti e:
// tyrmässä 10,8 min tasaista −42 dB:n hiljaisuutta, ääni ei ohjannut pelaajaa). Puhdas ajastin SeikkailuTyrmaAanet-sovittimelle:
// tippuva vesi holvista 2,5–7 s:n välein, kaukaiset askeleet käytävällä (ensimmäiset 12–20 s, sitten 35–60 s:n välein) ja muunnelman
// ohjaava ääni: 1 avainten kilinä ilmaraossa ennen pudotusta ja olkien suunnasta, kunnes avaimet poimitaan; 2 raollaan olevan oven
// narahdus vedossa; 3 irtokiven rapina, kunnes kivi irtoaa. Satunnaisuus siemenestä (testattava).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Seikkailu
{
    public enum TyrmanAani { Tippa, Askeleet, AvainRaossa, AvainOlissa, OviVeto, KiviRapina }

    public sealed class TyrmanAanet
    {
        public const double TippaMinS = 2.5, TippaMaxS = 7, AskelEnsinMinS = 12, AskelEnsinMaxS = 20, AskelMinS = 35, AskelMaxS = 60;
        /// <summary>Avainten kilinä raossa ennen pudotusta (Tyrma.PuluTuleeS = 3 s).</summary>
        public const double AvainRaossaS = 1.2;
        /// <summary>Ohjaava ääni: ensimmäinen viive vaiheen alusta ja väli sen jälkeen.</summary>
        public const double OhjausEnsinS = 7, OhjausMinS = 10, OhjausMaxS = 14;

        readonly Random rnd;
        double tippa, askel, ohjaus = -1;
        bool raossa;
        TyrmanVaihe edellinen = TyrmanVaihe.Istuu;

        public TyrmanAanet(int siemen = 0)
        {
            rnd = new Random(siemen);
            tippa = Vali(0.8, 2.0);
            askel = Vali(AskelEnsinMinS, AskelEnsinMaxS);
        }

        double Vali(double a, double b) => a + rnd.NextDouble() * (b - a);
        /// <summary>Satunnaisluku 0–1 sovittimelle (paikka ja sävel samasta siemenestä).</summary>
        public double Satunnainen() => rnd.NextDouble();

        /// <summary>Etenee dt sekuntia; lisää soitettavat äänet listaan (tyhjentää sen ensin).</summary>
        public void Paivita(double dt, int muunnelma, TyrmanVaihe vaihe, double aika, List<TyrmanAani> ulos)
        {
            ulos.Clear();
            if (vaihe == TyrmanVaihe.Ulkona) return;
            if ((tippa -= dt) <= 0) { ulos.Add(TyrmanAani.Tippa); tippa = Vali(TippaMinS, TippaMaxS); }
            if ((askel -= dt) <= 0) { ulos.Add(TyrmanAani.Askeleet); askel = Vali(AskelMinS, AskelMaxS); }
            if (muunnelma == 1 && !raossa && vaihe == TyrmanVaihe.Istuu && aika >= AvainRaossaS) { raossa = true; ulos.Add(TyrmanAani.AvainRaossa); }
            var ohjaava = Ohjaava(muunnelma, vaihe);
            if (vaihe != edellinen) { edellinen = vaihe; ohjaus = ohjaava != null ? OhjausEnsinS : -1; }
            else if (ohjaava != null && ohjaus < 0) ohjaus = OhjausEnsinS;
            if (ohjaava == null) { ohjaus = -1; return; }
            if ((ohjaus -= dt) <= 0) { ulos.Add(ohjaava.Value); ohjaus = Vali(OhjausMinS, OhjausMaxS); }
        }

        /// <summary>Muunnelman ohjaava ääni tässä vaiheessa, tai null (tehtävä tehty).</summary>
        public static TyrmanAani? Ohjaava(int muunnelma, TyrmanVaihe vaihe) =>
            muunnelma == 1 && vaihe == TyrmanVaihe.AvaimetOlissa ? TyrmanAani.AvainOlissa
            : muunnelma == 2 && vaihe == TyrmanVaihe.OviAuki ? TyrmanAani.OviVeto
            : muunnelma == 3 && vaihe == TyrmanVaihe.Istuu ? TyrmanAani.KiviRapina
            : (TyrmanAani?)null;
    }
}
