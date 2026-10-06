// KYSYMYKSEN ODOTUSPORTAAT (omistaja hyväksyi, Päätoimittaja 6.10., juna 150; Pelikoodarin kuittaukset-v1): pelaajan kysymyksen
// jälkeen, jos vastaus ei ole alkanut, 5 s:ssa lause ODOTUS5, 12 s:ssa ODOTUS12 ja 25 s:ssa VIRHE (vastaus ei tule, pelaajaa
// kehotetaan kysymään uudelleen); myöhästynyt vastaus hylätään. Workerin virhe ennen aikarajaa → VIRHE heti. Moottoriton.
namespace Matkakirja.Linssit.Kierros
{
    public sealed class KysyOdotus
    {
        public const double Odotus5S = 5, Odotus12S = 12, VirheS = 25;
        public enum Tapahtuma { Ei, Odotus5, Odotus12, Virhe }

        double aika = -1;
        int porras;   // 0 = ei vielä lausetta, 1 = odotus5 soi, 2 = odotus12 soi, 3 = virhe
        /// <summary>Kysymyksen järjestysnumero: vastaus kelpaa vain, jos numero on yhä sama eikä aikaraja ole ylittynyt.</summary>
        public int Numero { get; private set; }
        public bool Kaynnissa => aika >= 0;

        public void Aloita() { aika = 0; porras = 0; Numero++; }

        /// <summary>Vastaus alkoi (ääni, teksti tai toiminto): portaat seis.</summary>
        public void Alkoi() { aika = -1; }

        /// <summary>Kelpaako kysymyksen nro vastaus vielä (ei uudempaa kysymystä eikä VIRHE-lausetta).</summary>
        public bool Kelpaa(int nro) => nro == Numero && porras < 3;

        /// <summary>Workerin virhe: VIRHE heti (jos tämä kysymys on yhä voimassa). true = soita VIRHE.</summary>
        public bool Epaonnistui(int nro)
        {
            if (!Kelpaa(nro) || !Kaynnissa) return false;
            porras = 3; aika = -1;
            return true;
        }

        public Tapahtuma Paivita(double dt)
        {
            if (aika < 0) return Tapahtuma.Ei;
            aika += dt < 0 ? 0 : dt;
            if (porras < 3 && aika >= VirheS) { porras = 3; aika = -1; return Tapahtuma.Virhe; }
            if (porras < 2 && aika >= Odotus12S) { porras = 2; return Tapahtuma.Odotus12; }
            if (porras < 1 && aika >= Odotus5S) { porras = 1; return Tapahtuma.Odotus5; }
            return Tapahtuma.Ei;
        }
    }
}
