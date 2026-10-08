// HISTORIAMOOTTORI: VENEYÖN OPPITUNTI (Siirtoseppä 8.10.2026; omistajan palaute: "soutukohtaus aivan liian pitkä, ellei siinä pysty pelaaja
// jotain tekemään"). Fogg on pressun alla; katse ylös (yli 8°) on kurkistus, joka nostaa päätä. Portinvartijan lyhty pyyhkäisee venettä:
// ensin valopiiri kasvaa veneen reunalla 2 s (varoitus), sitten valo 2,5 s. Jos pelaaja kurkistaa valon aikana, hänet nähdään ("Hä?"),
// eikä rangaistusta tule: pyyhkäisy toistuu 4 s:n päästä, kunnes se menee ohi pelaajan ollessa piilossa (enintään 3 yritystä, sitten
// läpi). Piiloutumisen ensimmäinen oppitunti ilman tekstiä.
namespace Matkakirja.Linssit.Seikkailu
{
    public enum PressuVaihe { Odottaa, Varoitus, Valo, Tauko, Opittu }

    public sealed class Pressu
    {
        public const double EnsinS = 7, VaroitusS = 2, ValoS = 2.5, TaukoS = 4, KurkistusAste = 8, SilmaAlla = 0.7, SilmaKurkistus = 1.0, NousuS = 0.35;
        public const int Yrityksia = 3;
        public PressuVaihe Vaihe { get; private set; } = PressuVaihe.Odottaa;
        public double VaiheS { get; private set; }
        public int Yritys { get; private set; }
        /// <summary>Silmien korkeus vedestä (m): pressun alla 0,7, kurkistaessa 1,0 (pehmeästi 0,35 s).</summary>
        public double Silma { get; private set; } = SilmaAlla;
        public bool Kurkistaa { get; private set; }
        /// <summary>Kertalaukaisut sovittimelle (nollaa itse): nähtiin (portinvartijan "Hä?" ja sydän), oppi (pyyhkäisy meni ohi).</summary>
        public bool Nahtiin, Oppi;
        bool nahtyTalla;

        public void Paivita(double dt, double katsePitch)
        {
            Kurkistaa = katsePitch > KurkistusAste;
            double tavoite = Kurkistaa ? SilmaKurkistus : SilmaAlla, askel = (SilmaKurkistus - SilmaAlla) * dt / NousuS;
            Silma = Silma < tavoite ? System.Math.Min(tavoite, Silma + askel) : System.Math.Max(tavoite, Silma - askel);
            VaiheS += dt;
            switch (Vaihe)
            {
                case PressuVaihe.Odottaa: if (VaiheS >= EnsinS - 1e-6) Siirry(PressuVaihe.Varoitus); break;
                case PressuVaihe.Varoitus: if (VaiheS >= VaroitusS - 1e-6) { Siirry(PressuVaihe.Valo); nahtyTalla = false; } break;
                case PressuVaihe.Valo:
                    if (Kurkistaa && !nahtyTalla) { nahtyTalla = true; Nahtiin = true; }
                    if (VaiheS >= ValoS - 1e-6)
                    {
                        Yritys++;
                        if (!nahtyTalla || Yritys >= Yrityksia) { Siirry(PressuVaihe.Opittu); Oppi = !nahtyTalla; }
                        else Siirry(PressuVaihe.Tauko);
                    }
                    break;
                case PressuVaihe.Tauko: if (VaiheS >= TaukoS - 1e-6) Siirry(PressuVaihe.Varoitus); break;
            }
        }

        /// <summary>Vene perillä (LS2 8.10.: kolmas pyyhkäisy osui 24–28,5 s:iin, vene on laiturissa 22 s): oppitunti päättyy, lyhty sammuu.</summary>
        public void Lopeta() { if (Vaihe != PressuVaihe.Opittu) Siirry(PressuVaihe.Opittu); Nahtiin = false; }

        void Siirry(PressuVaihe v) { Vaihe = v; VaiheS = 0; }
    }
}
