// HISTORIAMOOTTORI: TYRMÄN ÄÄNIYMPÄRISTÖ (Pelikoodari 11.10.2026; PT:n Olavinlinna-yösuunnitelma B3, Laitetestaajan TF 180 -raportti e:
// tyrmässä 10,8 min tasaista −42 dB:n hiljaisuutta, ääni ei ohjannut pelaajaa). Puhdas ajastin SeikkailuTyrmaAanet-sovittimelle:
// harvat satunnaiset tapahtumat tyrmän pohjaäänen päällä (Laitetestaajan 4. kierros: pohja −30 dB tasainen 7,4 min ilman tapahtumia;
// PT 11.10. 06.0x): ensimmäinen 8–14 s:ssa, sitten 20–40 s:n välein, vuorotellen eri lajia (ei samaa kahdesti peräkkäin): iso pisara
// holvista, kaukaiset askeleet käytävällä tai metallin kalahdus oven takana (vartijan varusteet). Lisäksi muunnelman ohjaava ääni: 1 avainten kilinä ilmaraossa ennen pudotusta ja olkien suunnasta, kunnes avaimet poimitaan; 2 raollaan olevan oven
// narahdus vedossa; 3 irtokiven rapina, kunnes kivi irtoaa. Satunnaisuus siemenestä (testattava).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Seikkailu
{
    public enum TyrmanAani { Tippa, Askeleet, Metalli, AvainRaossa, AvainOlissa, OviVeto, KiviRapina }

    public sealed class TyrmanAanet
    {
        public const double EnsinMinS = 8, EnsinMaxS = 14, ValiMinS = 20, ValiMaxS = 40;
        /// <summary>Satunnaiset tapahtumat, joista arvotaan (ohjaavat äänet erikseen).</summary>
        public static readonly TyrmanAani[] Tapahtumat = { TyrmanAani.Tippa, TyrmanAani.Askeleet, TyrmanAani.Metalli };
        /// <summary>Avainten kilinä raossa ennen pudotusta (Tyrma.PuluTuleeS = 3 s).</summary>
        public const double AvainRaossaS = 1.2;
        /// <summary>Ohjaava ääni: ensimmäinen viive vaiheen alusta ja väli sen jälkeen.</summary>
        public const double OhjausEnsinS = 7, OhjausMinS = 10, OhjausMaxS = 14;

        readonly Random rnd;
        double tapahtuma, ohjaus = -1;
        TyrmanAani? viimeisin;
        bool raossa;
        TyrmanVaihe edellinen = TyrmanVaihe.Istuu;

        public TyrmanAanet(int siemen = 0)
        {
            rnd = new Random(siemen);
            tapahtuma = Vali(EnsinMinS, EnsinMaxS);
        }

        double Vali(double a, double b) => a + rnd.NextDouble() * (b - a);
        /// <summary>Satunnaisluku 0–1 sovittimelle (paikka ja sävel samasta siemenestä).</summary>
        public double Satunnainen() => rnd.NextDouble();

        /// <summary>Etenee dt sekuntia; lisää soitettavat äänet listaan (tyhjentää sen ensin).</summary>
        public void Paivita(double dt, int muunnelma, TyrmanVaihe vaihe, double aika, List<TyrmanAani> ulos)
        {
            ulos.Clear();
            if (vaihe == TyrmanVaihe.Ulkona) return;
            if ((tapahtuma -= dt) <= 0)
            {
                // Eri laji kuin edellinen: arvotaan muista kahdesta.
                int i = (int)(rnd.NextDouble() * (Tapahtumat.Length - (viimeisin == null ? 0 : 1)));
                foreach (var t in Tapahtumat) { if (t == viimeisin) continue; if (i-- == 0) { viimeisin = t; ulos.Add(t); break; } }
                tapahtuma = Vali(ValiMinS, ValiMaxS);
            }
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
