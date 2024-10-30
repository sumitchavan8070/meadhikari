import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const TermsAndConditions = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Terms & Conditions</Text>
        <Text style={styles.date}>Last updated on Apr 24th 2024</Text>

        <Text style={styles.section}>
          For the purpose of these Terms and Conditions, the term "we", "us",
          "our" used anywhere on this page shall mean MEADHIKARI, whose
          registered/operational office is Satara MAHARASHTRA. "You", “your”,
          "user", “visitor” shall mean any natural or legal person who is
          visiting our website/mobile-app and/or agreed to purchase from us.
        </Text>

        <Text style={styles.section}>
          Your use of the website/mobile-app and/or purchase from us are
          governed by the following Terms and Conditions:
        </Text>

        <Text style={styles.section}>
          The content of the pages of this website is subject to change without
          notice.
        </Text>

        <Text style={styles.section}>
          Neither we nor any third parties provide any warranty or guarantee as
          to the accuracy, timeliness, performance, completeness or suitability
          of the information and materials found or offered on this
          website/mobile-app for any particular purpose. You acknowledge that
          such information and materials may contain inaccuracies or errors and
          we expressly exclude liability for any such inaccuracies or errors to
          the fullest extent permitted by law.
        </Text>

        <Text style={styles.section}>
          Your use of any information or materials on our website/mobile-app
          and/or product pages is entirely at your own risk, for which we shall
          not be liable. It shall be your own responsibility to ensure that any
          products, services or information available through our
          website/mobile-app and/or product pages meet your specific
          requirements.
        </Text>

        <Text style={styles.section}>
          Our website/mobile-app contains material which is owned by or licensed
          to us. This material includes, but is not limited to, the design,
          layout, look, appearance and graphics. Reproduction is prohibited
          other than in accordance with the copyright notice, which forms part
          of these terms and conditions.
        </Text>

        <Text style={styles.section}>
          All trademarks reproduced in our website/mobile-app which are not the
          property of, or licensed to, the operator are acknowledged on the
          website/mobile-app.
        </Text>

        <Text style={styles.section}>
          Unauthorized use of information provided by us shall give rise to a
          claim for damages and/or be a criminal offense.
        </Text>

        <Text style={styles.section}>
          From time to time our website/mobile-app may also include links to
          other website/mobile-app. These links are provided for your
          convenience to provide further information.
        </Text>

        <Text style={styles.section}>
          You may not create a link to our website/mobile-app from another
          website/mobile-app or document without MEADHIKARI’s prior written
          consent.
        </Text>

        <Text style={styles.section}>
          Any dispute arising out of use of our website/mobile-app and/or
          purchase with us and/or any engagement with us is subject to the laws
          of India.
        </Text>

        <Text style={styles.section}>
          We shall be under no liability whatsoever in respect of any loss or
          damage arising directly or indirectly out of the decline of
          authorization for any Transaction, on Account of the Cardholder having
          exceeded the preset limit mutually agreed by us with our acquiring
          bank from time to time.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  section: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});

export default TermsAndConditions;
