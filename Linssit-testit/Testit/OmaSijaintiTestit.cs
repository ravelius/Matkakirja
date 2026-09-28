using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class OmaSijaintiTestit
    {
        [Testi] static void MaaTraceRivilta()
        {
            Oleta.Sama("FI", OmaSijainti.LueMaa("fl=12f1\nh=media.matkakirja.app\nip=1.2.3.4\nts=1\nvisit_scheme=https\ncolo=RIX\nloc=FI\ntls=TLSv1.3\n"));
            Oleta.Sama("SE", OmaSijainti.LueMaa("loc=se\r\n"));
            Oleta.Sama(null, OmaSijainti.LueMaa("loc=XX\n"), "tuntematon");
            Oleta.Sama(null, OmaSijainti.LueMaa("loc=T1\n"), "Tor");
            Oleta.Sama(null, OmaSijainti.LueMaa("colo=RIX\n"));
            Oleta.Sama(null, OmaSijainti.LueMaa(null));
        }

        [Testi] static void ValikonRivi()
        {
            Oleta.Sama("Oma sijainti · Suomi", OmaSijainti.Rivi("Suomi"));
            Oleta.Sama("Oma sijainti", OmaSijainti.Rivi(null));
        }
    }
}
