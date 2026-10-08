// Oman kerroksen kamerat (TF 167 -regressio 9.10.2026: kehityskaupunkien värillinen pallo puuttui kartalta, koska kipsipallon
// kamera riisui kerroksen värillisen pallon kameralta). Toistaa luontijärjestyksen: pääkamera, värillinen pallo, kipsipallo, pää.
namespace Matkakirja.Linssit.Testit
{
    public static class KerrosKameratTestit
    {
        const int Kerros = 13, Kaikki = ~0;

        static void Riisu(KerrosKamerat r, int[] idt, int[] maskit)
        {
            for (int i = 0; i < idt.Length; i++) maskit[i] = r.Maski(idt[i], maskit[i], Kerros);
        }

        [Testi] static void KipsipalloEiRiisuVarillisenPallonKameraa()
        {
            var r = new KerrosKamerat();
            int paa = 1, varillinen = 2, kipsi = 3, ajattelija = 4;
            var idt = new[] { paa, varillinen, kipsi, ajattelija };
            var maskit = new[] { Kaikki, 1 << Kerros, 1 << Kerros, 1 << Kerros };
            r.Lisaa(varillinen); Riisu(r, idt, maskit);
            r.Lisaa(kipsi); Riisu(r, idt, maskit);
            r.Lisaa(ajattelija); Riisu(r, idt, maskit);
            Oleta.Tosi((maskit[1] & (1 << Kerros)) != 0, "värillisen pallon kamera piirtää kerroksen (kehityskaupungit Pariisi ja Tukholma)");
            Oleta.Tosi((maskit[2] & (1 << Kerros)) != 0, "kipsipallon kamera piirtää kerroksen");
            Oleta.Tosi((maskit[3] & (1 << Kerros)) != 0, "ajattelijan kamera piirtää kerroksen");
            Oleta.Tosi((maskit[0] & (1 << Kerros)) == 0, "pääkamera ei piirrä kerrosta (ei tuplana maailmaan)");
            Oleta.Tosi((maskit[0] & 1) != 0, "pääkameran muut kerrokset ennallaan");
        }
    }
}
