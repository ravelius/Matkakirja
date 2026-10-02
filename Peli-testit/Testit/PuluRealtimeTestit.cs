// Pulun äänikeskustelun puhdas logiikka (Peli/PuluRealtimeLogiikka.cs) webin js/pulu-realtime.js-, js/pollo.js-
// ja tools/pollo/realtime-koe.mjs-mallia vasten: napin tekstit, tapahtumien toimenpiteet (kasittele), tilakone,
// token-pyyntö ja -vastaus, istunnon raaka-JSON session.updateen, append-viesti, PCM16 ja Unity-toiston jono.
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli.Testit
{
    static class PuluRealtimeTestit
    {
        [Testi] static void NappiTekstitOvatWebin()
        {
            // js/pollo.js REALTIME_NAPPI_TEKSTIT
            Oleta.Sama("Live", PuluRealtimeLogiikka.NappiTeksti(RealtimeTila.Valmis));
            Oleta.Sama("Yhdistän Puluun…", PuluRealtimeLogiikka.NappiTeksti(RealtimeTila.Yhdistaa));
            Oleta.Sama("Kuuntelen — lopeta", PuluRealtimeLogiikka.NappiTeksti(RealtimeTila.Kuuntelee));
            Oleta.Sama("Pulu puhuu — lopeta", PuluRealtimeLogiikka.NappiTeksti(RealtimeTila.Puhuu));
        }

        [Testi] static void TapahtumatKutenKasittele()
        {
            RealtimeTapahtuma J(string json) => PuluRealtimeLogiikka.Jasenna(json);
            Oleta.Sama(RealtimeLaji.PuheAlkoi, J("{\"type\":\"input_audio_buffer.speech_started\",\"audio_start_ms\":120}").Laji);
            Oleta.Sama(RealtimeLaji.VuoroPaattyi, J("{\"type\":\"input_audio_buffer.committed\"}").Laji);
            var k = J("{\"type\":\"conversation.item.input_audio_transcription.completed\",\"transcript\":\"  Missä ollaan? \"}");
            Oleta.Sama(RealtimeLaji.Kayttaja, k.Laji);
            Oleta.Sama("Missä ollaan?", k.Teksti, "transcript trimmataan");
            Oleta.Sama("", J("{\"type\":\"conversation.item.input_audio_transcription.completed\"}").Teksti, "puuttuva = tyhjä");
            var a = J("{\"type\":\"response.output_audio.delta\",\"delta\":\"AAD/fw==\"}");
            Oleta.Sama(RealtimeLaji.Aani, a.Laji);
            Oleta.Sama("AAD/fw==", a.Teksti);
            Oleta.Sama(RealtimeLaji.Aani, J("{\"type\":\"response.audio.delta\",\"delta\":\"AAA=\"}").Laji, "vanha nimi");
            var p = J("{\"type\":\"response.output_audio_transcript.delta\",\"delta\":\"Rooma \\\"ikuinen\\\"\"}");
            Oleta.Sama(RealtimeLaji.PuluPala, p.Laji);
            Oleta.Sama("Rooma \"ikuinen\"", p.Teksti);
            Oleta.Sama(RealtimeLaji.Ohita, J("{\"type\":\"response.output_audio_transcript.delta\",\"delta\":\"\"}").Laji, "tyhjä pala ohi");
            Oleta.Sama(RealtimeLaji.PuluValmis, J("{\"type\":\"response.done\",\"response\":{\"usage\":{}}}").Laji);
            Oleta.Sama(RealtimeLaji.IstuntoPaivitetty, J("{\"type\":\"session.updated\",\"session\":{}}").Laji);
            Oleta.Sama(RealtimeLaji.Ohita, J("{\"type\":\"response.created\"}").Laji);
            Oleta.Sama(RealtimeLaji.Ohita, J("{\"type\":\"input_audio_buffer.speech_stopped\"}").Laji);
        }

        [Testi] static void RikkinainenViestiEiKaada()
        {
            Oleta.Sama(RealtimeLaji.Ohita, PuluRealtimeLogiikka.Jasenna("{\"type\":").Laji);
            Oleta.Sama(RealtimeLaji.Ohita, PuluRealtimeLogiikka.Jasenna("").Laji);
            Oleta.Sama(RealtimeLaji.Ohita, PuluRealtimeLogiikka.Jasenna(null).Laji);
            Oleta.Sama(RealtimeLaji.Ohita, PuluRealtimeLogiikka.Jasenna("[1,2]").Laji);
        }

        [Testi] static void VirheViestiKutenWeb()
        {
            var v = PuluRealtimeLogiikka.Jasenna("{\"type\":\"error\",\"error\":{\"message\":\"Invalid session\"}}");
            Oleta.Sama(RealtimeLaji.Virhe, v.Laji);
            Oleta.Sama("Pulun äänilinja: Invalid session", v.Teksti);
            Oleta.Sama("Pulun äänilinja: virhe", PuluRealtimeLogiikka.Jasenna("{\"type\":\"error\"}").Teksti);
            var pitka = new string('x', 300);
            var p = PuluRealtimeLogiikka.Jasenna("{\"type\":\"error\",\"error\":{\"message\":\"" + pitka + "\"}}");
            Oleta.Sama("Pulun äänilinja: ".Length + 160, p.Teksti.Length, "slice(0, 160)");
        }

        [Testi] static void Tilakone()
        {
            RealtimeTila? S(RealtimeTila t, RealtimeLaji l) => PuluRealtimeLogiikka.SeuraavaTila(t, l);
            Oleta.Sama(RealtimeTila.Puhuu, S(RealtimeTila.Kuuntelee, RealtimeLaji.Aani));
            Oleta.Sama(null, S(RealtimeTila.Puhuu, RealtimeLaji.Aani));
            Oleta.Sama(RealtimeTila.Kuuntelee, S(RealtimeTila.Puhuu, RealtimeLaji.PuheAlkoi), "pelaaja puhuu päälle");
            Oleta.Sama(null, S(RealtimeTila.Kuuntelee, RealtimeLaji.PuheAlkoi));
            Oleta.Sama(null, S(RealtimeTila.Valmis, RealtimeLaji.Aani), "loppunut ei herää");
            Oleta.Sama(null, S(RealtimeTila.Yhdistaa, RealtimeLaji.Aani), "yhdistäessä ei vielä");
            Oleta.Sama(null, S(RealtimeTila.Puhuu, RealtimeLaji.PuluPala));
            Oleta.Tosi(PuluRealtimeLogiikka.SoittoLoppui(RealtimeTila.Puhuu, 0));
            Oleta.Tosi(!PuluRealtimeLogiikka.SoittoLoppui(RealtimeTila.Puhuu, 480));
            Oleta.Tosi(!PuluRealtimeLogiikka.SoittoLoppui(RealtimeTila.Kuuntelee, 0));
        }

        [Testi] static void TokenRunkoKutenWeb()
        {
            var runko = PuluRealtimeLogiikka.TokenRunko("Lauta: Maailmankartta\nKaupunki: \"Rooma\"", "ara");
            var o = MiniJson.Objekti(MiniJson.Jasenna(runko));
            Oleta.Sama("realtime", (string)o["tehtava"]);
            Oleta.Sama("Lauta: Maailmankartta\nKaupunki: \"Rooma\"", (string)o["konteksti"]);
            Oleta.Sama("ara", (string)o["aani"]);
            Oleta.Sama(24000.0, (double)o["taajuus"]);
            Oleta.Tosi(!MiniJson.Objekti(MiniJson.Jasenna(PuluRealtimeLogiikka.TokenRunko(null, null))).ContainsKey("aani"), "ei ääntä = workerin oletus");
        }

        const string WorkerinVastaus =
            "{\"token\":\"xrt-abc.123\",\"vanhenee\":1790000000,\"osoite\":\"wss://api.x.ai/v1/realtime?model=grok-voice-latest\","
            + "\"enintaanS\":180,\"kaytetty\":3,\"raja\":60,"
            + "\"istunto\":{\"voice\":\"ara\",\"instructions\":\"Olet Livia {pulu} \\\"[x]\\\" }\",\"reasoning\":{\"effort\":\"none\"},"
            + "\"turn_detection\":{\"type\":\"server_vad\",\"silence_duration_ms\":600},"
            + "\"audio\":{\"input\":{\"format\":{\"type\":\"audio/pcm\",\"rate\":24000}},\"output\":{\"format\":{\"type\":\"audio/pcm\",\"rate\":24000}}}}}";

        [Testi] static void TokenVastausOk()
        {
            var t = PuluRealtimeLogiikka.LueToken(200, WorkerinVastaus);
            Oleta.Tosi(t.Ok);
            Oleta.Sama("xrt-abc.123", t.Token);
            Oleta.Sama("wss://api.x.ai/v1/realtime?model=grok-voice-latest", t.Osoite);
            Oleta.Sama(180, t.EnintaanS);
            Oleta.Tosi(t.Istunto.StartsWith("{\"voice\":\"ara\"") && t.Istunto.EndsWith("}}}}"), t.Istunto);
            // Raaka istunto = sama olio kuin workerin (jäsennettynä), ja session.update kantaa sen sellaisenaan.
            var paivitys = MiniJson.Objekti(MiniJson.Jasenna(PuluRealtimeLogiikka.IstuntoPaivitys(t.Istunto)));
            Oleta.Sama("session.update", (string)paivitys["type"]);
            var istunto = MiniJson.Objekti(paivitys["session"]);
            Oleta.Sama("Olet Livia {pulu} \"[x]\" }", (string)istunto["instructions"]);
            Oleta.Sama(600.0, (double)MiniJson.Objekti(istunto["turn_detection"])["silence_duration_ms"]);
            Oleta.Tosi(PuluRealtimeLogiikka.IstuntoPaivitys(t.Istunto).Contains(t.Istunto), "merkilleen sama");
        }

        [Testi] static void TokenVastausVirhe()
        {
            var koodi = PuluRealtimeLogiikka.LueToken(403, "{\"virhe\":\"koodi\",\"viesti\":\"Äänikeskustelun koe on vain kehittäjälle.\"}");
            Oleta.Tosi(!koodi.Ok);
            Oleta.Sama("Äänikeskustelun koe on vain kehittäjälle.", koodi.Viesti);
            Oleta.Sama("koodi", koodi.Virhe);
            var raja = PuluRealtimeLogiikka.LueToken(429, "{\"virhe\":\"paiva\",\"viesti\":\"Päivän kokeiluminuutit on käytetty.\"}");
            Oleta.Sama("Päivän kokeiluminuutit on käytetty.", raja.Viesti);
            // Verkkovirhe tai tyhjä runko: web-oletus.
            var tyhja = PuluRealtimeLogiikka.LueToken(0, null);
            Oleta.Tosi(!tyhja.Ok);
            Oleta.Sama("Pulu ei saanut äänilinjaa auki.", tyhja.Viesti);
            var eiTokenia = PuluRealtimeLogiikka.LueToken(200, "{\"osoite\":\"wss://x\"}");
            Oleta.Tosi(!eiTokenia.Ok, "ilman tokenia ei yhdistetä");
            Oleta.Sama("Pulu ei saanut äänilinjaa auki.", eiTokenia.Viesti);
            // 200 ja token, mutta HTML-virhesivu ei kelpaa.
            Oleta.Tosi(!PuluRealtimeLogiikka.LueToken(200, "<html>").Ok);
        }

        [Testi] static void RaakaKentta()
        {
            Oleta.Sama("{\"x\":\"}\"}", PuluRealtimeLogiikka.RaakaKentta("{\"a\":{\"istunto\":1},\"istunto\":{\"x\":\"}\"}}", "istunto"), "vain ylin taso");
            Oleta.Sama("[1,[2,{\"b\":\"]\"}]]", PuluRealtimeLogiikka.RaakaKentta("{ \"t\" : [1,[2,{\"b\":\"]\"}]] }", "t"));
            Oleta.Sama("\"a\\\"b\"", PuluRealtimeLogiikka.RaakaKentta("{\"s\":\"a\\\"b\"}", "s"));
            Oleta.Sama("12.5", PuluRealtimeLogiikka.RaakaKentta("{\"n\":12.5,\"m\":true}", "n"));
            Oleta.Sama("true", PuluRealtimeLogiikka.RaakaKentta("{\"n\":12.5,\"m\":true}", "m"));
            Oleta.Sama("null", PuluRealtimeLogiikka.RaakaKentta("{\"n\":null}", "n"));
            Oleta.Sama(null, PuluRealtimeLogiikka.RaakaKentta("{\"n\":1}", "istunto"));
            Oleta.Sama(null, PuluRealtimeLogiikka.RaakaKentta("{\"istunto\":{\"a\":1", "istunto"), "katkennut");
            Oleta.Sama(null, PuluRealtimeLogiikka.RaakaKentta("[{\"istunto\":{}}]", "istunto"));
            Oleta.Sama("{}", PuluRealtimeLogiikka.RaakaKentta("{\"\\u0069stunto\":{}}", "istunto"), "avaimen escape");
        }

        [Testi] static void IstuntoPaivitysIlmanIstuntoa()
        {
            Oleta.Sama("{\"type\":\"session.update\",\"session\":{}}", PuluRealtimeLogiikka.IstuntoPaivitys(null));
        }

        [Testi] static void AppendViestiJaAliprotokolla()
        {
            var pcm = new byte[] { 9, 0, 0x01, 0x80, 0xff, 0x7f, 7 };
            var v = MiniJson.Objekti(MiniJson.Jasenna(PuluRealtimeLogiikka.AppendViesti(pcm, 1, 5)));
            Oleta.Sama("input_audio_buffer.append", (string)v["type"]);
            Oleta.Sama(Convert.ToBase64String(new byte[] { 0, 0x01, 0x80, 0xff, 0x7f }), (string)v["audio"]);
            Oleta.Sama("xai-client-secret.xrt-abc.123", PuluRealtimeLogiikka.Aliprotokolla("xrt-abc.123"));
            // 40 ms 24 kHz:llä PCM16 monona (realtime-koe.mjs PALA_MS, palaTavut).
            Oleta.Sama(1920, PuluRealtimeLogiikka.LahetysTavut);
        }

        [Testi] static void PcmFloatKutenWeb()
        {
            // web pcmFloat: little endian, v >= 0x8000 → v − 0x10000, / 0x8000.
            var n = PuluRealtimeLogiikka.PcmFloat(Convert.ToBase64String(new byte[] { 0x00, 0x80, 0xff, 0x7f, 0x00, 0x00, 0x00, 0x40, 0x12 }));
            Oleta.Sama(4, n.Length, "pariton lopputavu ohi");
            Oleta.Sama(-1f, n[0]);
            Oleta.Sama(32767f / 32768f, n[1]);
            Oleta.Sama(0f, n[2]);
            Oleta.Sama(0.5f, n[3]);
            Oleta.Sama(0, PuluRealtimeLogiikka.PcmFloat("ei base64:ää!").Length);
            Oleta.Sama(0, PuluRealtimeLogiikka.PcmFloat(null).Length);
        }

        [Testi] static void Aikaraja()
        {
            // web: Math.max(30, Number(data.enintaanS) || 180)
            Oleta.Sama(180, PuluRealtimeLogiikka.EnintaanS(null));
            Oleta.Sama(180, PuluRealtimeLogiikka.EnintaanS(0));
            Oleta.Sama(180, PuluRealtimeLogiikka.EnintaanS(double.NaN));
            Oleta.Sama(30, PuluRealtimeLogiikka.EnintaanS(10));
            Oleta.Sama(30, PuluRealtimeLogiikka.EnintaanS(-5));
            Oleta.Sama(300, PuluRealtimeLogiikka.EnintaanS(300));
            Oleta.Tosi(!PuluRealtimeLogiikka.AikaLoppui(100, 279.9, 180));
            Oleta.Tosi(PuluRealtimeLogiikka.AikaLoppui(100, 280, 180));
        }

        [Testi] static void AaniJonoSoittaaJaTayttaaHiljaisuudella()
        {
            var j = new AaniJono(8);
            j.Kirjoita(new[] { 1f, 2f, 3f }, 3);
            Oleta.Sama(3, j.Maara);
            var ulos = new float[5];
            Oleta.Sama(3, j.Lue(ulos));
            Oleta.Sama("1,2,3,0,0", string.Join(",", ulos));
            Oleta.Sama(0, j.Maara);
            // Rengas kiertää.
            j.Kirjoita(new[] { 4f, 5f, 6f, 7f, 8f, 9f }, 6);
            j.Lue(new float[4]);
            j.Kirjoita(new[] { 10f, 11f, 12f, 13f }, 4);
            var loput = new float[6];
            Oleta.Sama(6, j.Lue(loput));
            Oleta.Sama("8,9,10,11,12,13", string.Join(",", loput));
        }

        [Testi] static void AaniJonoTayttyessaVanhinPois()
        {
            var j = new AaniJono(4);
            j.Kirjoita(new[] { 1f, 2f, 3f }, 3);
            j.Kirjoita(new[] { 4f, 5f }, 2);
            var ulos = new float[4];
            Oleta.Sama(4, j.Lue(ulos));
            Oleta.Sama("2,3,4,5", string.Join(",", ulos));
            j.Kirjoita(new[] { 1f, 2f, 3f, 4f, 5f, 6f }, 6);
            j.Lue(ulos);
            Oleta.Sama("3,4,5,6", string.Join(",", ulos), "kapasiteettia pidempi pala: loppu");
            j.Kirjoita(new[] { 1f, 2f }, 2);
            j.Tyhjenna();
            Oleta.Sama(0, j.Maara, "vaienna");
            Oleta.Sama(0, j.Lue(ulos));
            Oleta.Sama("0,0,0,0", string.Join(",", ulos));
        }
    }
}
