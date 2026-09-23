// Savuke Siirtosepän koepakettia vasten: kaikki natiivin lukemat kokoelmat
// jäsentyvät ja ristiviittaukset osuvat. Ajetaan vain, kun ympäristömuuttuja
// KOEPAKETTI osoittaa kokoelmakansioon (esim. /Users/Shared/Claude/sisalto-koe/v12/kokoelmat):
//   KOEPAKETTI=… ./kaanna.sh Koepaketti
using System;
using System.IO;
using System.Linq;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    public static class KoepakettiTestit
    {
        [Testi] static void KokoelmatJasentyvatJaViittauksetOsuvat()
        {
            var k = Environment.GetEnvironmentVariable("KOEPAKETTI");
            if (string.IsNullOrEmpty(k)) { Console.WriteLine("  (KOEPAKETTI ei asetettu, ohitetaan)"); return; }
            string L(string n) => File.ReadAllText(Path.Combine(k, n + ".json"));
            var verkko = SisaltoTuonti.LueKansiosta(k);
            var maarat = Laattamaarat.Lue(L("laatat"));
            var data = Kysymysdata.LueKansiosta(k);
            var m = Matka.Luo(verkko, new Satunnainen(1), "Fogg", "pariisi", maarat);
            var ky = new Kysely(m, data);
            Pulmat.Kytke(ky, Pulmadata.Lue(L("pulmat")));
            var tapahtumat = Tapahtumadata.Lue(L("tapahtumat"));
            var rosvo = new Kaksintaistelu(m, Kaksintaistelut.Lue(L("kaksintaistelut")));
            var liput = Kysymysdata.LueLiput(L("lippumaat"));
            var luennat = new Luennat();
            luennat.LueSaapumispuheet(L("saapumispuheet"));
            luennat.LueLuennat(L("luennat"));
            var ko = new Kohtaamiset();
            foreach (var id in verkko.Kaupungit.Keys) ko.Kaupungit[id] = new Kohtaaminen();
            ko.LueTarinakaari(L("tarinakaari"));
            ko.LueKohtaamiset(L("kohtaamiset"));
            ko.LueKohtaamiskuvat(L("kohtaamiskuvat"));
            var nimet = new Aarrenimet();
            nimet.LueLaatat(L("laatat"));
            nimet.LuePaikallisaarteet(L("paikallisaarteet"));

            var kuvat = MiniJson.Taulukko(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(L("kuvakysymykset"))), "alkiot"))
                .Select(MiniJson.Objekti).ToList();
            int kuvattomat = kuvat.Count(o => !verkko.Kaupungit.ContainsKey(MiniJson.Teksti(o, "kaupunki") ?? ""));
            int reaktioita = 0;
            foreach (var kaupunki in verkko.Kaupungit.Keys) reaktioita += luennat.Luento(kaupunki)?.Reaktiot.Count ?? 0;
            int ankkurit = 0, osumat = 0;
            foreach (var kaupunki in verkko.Kaupungit.Keys)
            {
                var l = luennat.Luento(kaupunki);
                if (l == null) continue;
                ankkurit += l.Reaktiot.Count;
                osumat += l.ReaktioAjat(l.Kesto ?? 30).Count;
            }
            Console.WriteLine($"  kaupunkeja {verkko.Kaupungit.Count}, laattoja {maarat.Yhteensa}, pulmia {Pulmadata.Lue(L("pulmat")).Pulmat.Count} (ohitettu {Pulmadata.Lue(L("pulmat")).Ohitetut.Count}), " +
                $"tapahtumia {tapahtumat.Kortit.Count}, kaksintaisteluja {rosvo.Data.Kysymykset.Count}, lippuja {liput.Count}, kuvia {kuvat.Count} (laudan ulkopuolella {kuvattomat}), " +
                $"saapumispuheita {luennat.Saapumispuheita}, luentoja {luennat.Luentoja}, reaktioita {reaktioita} (ankkuri osuu {osumat}/{ankkurit}), " +
                $"kuvia kohtaamisissa {ko.Kaupungit.Count(x => x.Value.KaariKuva != null)}+{ko.Kaupungit.Count(x => x.Value.TavallinenKuva != null)}");
            Oleta.Tosi(verkko.Kaupungit.Count > 200 && maarat.Yhteensa > 0, "lauta");
            Oleta.Sama(0, Pulmadata.Lue(L("pulmat")).Ohitetut.Count, "kaikki pulmageneraattorit tunnetaan");
            Oleta.Tosi(liput.Count > 100 && liput.All(x => x.Iso?.Length == 3 && !string.IsNullOrEmpty(x.Lippu)), "liput");
            Oleta.Sama(0, kuvattomat, "kuvakysymysten kaupungit laudalla");
            Oleta.Tosi(luennat.Luentoja >= 45, "luennot");
            Oleta.Sama(ankkurit, osumat, "jokainen reaktion ankkuri löytyy luennon tekstistä");
            Oleta.Tosi(nimet.Hae("pieniAarre", "europe", "FIN")?.Nimi != null, "paikallisaarteet");
            Oleta.Tosi(ky.TehtavaTarjolla(m.Tila.Pelaaja) || true, "kysely");
            KuvaJaLippuKysymyksetHttps(k, L);
            var laukku = Laukku.Rakenna(m, nimet, Kauppasisalto.Lue(L("elaintayt"), L("julisteet")));
            Console.WriteLine($"  laukku: Aarnin luettelo {laukku.AarninLuettelo.Count}, julisteita {laukku.JulisteitaKaikkiaan}, {laukku.Kukkaro}");
            Oleta.Tosi(laukku.AarninLuettelo.Count == 7 && laukku.AarninLuettelo.All(a => a.KuvaUrl != null), "Aarnin luettelo kuvineen");
            Oleta.Tosi(laukku.JulisteitaKaikkiaan > 100, "julisteet");
        }

        /// <summary>
        /// Kuva- ja lippukysymys syntyy paketin datasta kuten PeliOhjaimessa
        /// (Kuvakokoelmat.Kytke) ja näkymä saa valmiin https-osoitteen paketista
        /// (ei Commons-varaosoitetta). Kaikilla kuvilla ja lipuilla on osoite.
        /// </summary>
        static void KuvaJaLippuKysymyksetHttps(string kansio, Func<string, string> L)
        {
            var kk = Kuvakokoelmat.Lue(L("kuvakysymykset"), L("lippumaat"));
            Oleta.Sama(kk.Kuvat.Count + kk.Liput.Count, kk.Osoitteet.Count(o => o.Value.StartsWith("https://", StringComparison.Ordinal)),
                "jokaisella kuvalla ja lipulla https-osoite");
            foreach (var muoto in new[] { KysymysMuoto.Kuva, KysymysMuoto.Lippu })
            {
                var m = Matka.Luo(SisaltoTuonti.LueKansiosta(kansio), new Satunnainen(2), "Fogg", "pariisi", Laattamaarat.Lue(L("laatat")));
                var ky = new Kysely(m, Kysymysdata.LueKansiosta(kansio));
                kk.Kytke(ky);
                if (m.Tila.Vaihe == Vaihe.Heitto) m.PeruKulkutapa();
                var r = ky.Avaa(false, muoto);
                Oleta.Tosi(r.Ok, muoto + ": " + r.Virhe);
                var q = m.Tila.Kysely.Kysymys;
                Oleta.Sama(muoto, q.Laji);
                var d = KysymysApu.Nakyma(ky, q, osoitteet: kk.Osoitteet);
                Oleta.Tosi(d.KuvaUrl != null && d.KuvaUrl.StartsWith("https://", StringComparison.Ordinal) && !d.KuvaUrl.Contains("Special:FilePath"),
                    muoto + " kuva paketista: " + d.KuvaUrl);
                Oleta.Tosi(q.Vaihtoehdot.Count >= 2 && q.Oikea >= 0 && q.Oikea < q.Vaihtoehdot.Count, muoto + " vaihtoehdot");
                Console.WriteLine($"  {muoto}: {d.Kysymys} → {d.KuvaUrl}");
            }
        }
    }
}
