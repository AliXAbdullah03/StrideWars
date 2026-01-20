import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Modal
} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [showForgot, setShowForgot] = useState(false);
  const [showSaveInfo, setShowSaveInfo] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showPasswordUpdated, setShowPasswordUpdated] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.wrapper}>
            <View style={styles.content}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.icon}>✉</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.passwordIcon}>
                    <Text style={styles.iconText}>?</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    secureTextEntry
                  />
                </View>
                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={() => setShowForgot(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              onPress={async () => {
                const done = await AsyncStorage.getItem('permissionsCompleted');
                if (done === 'true') {
                  navigation.navigate('Home');
                } else {
                  navigation.navigate('LocationPermission');
                }
              }}
            >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              {/* OR Separator */}
              <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>OR</Text>
                <View style={styles.separatorLine} />
              </View>

              {/* Google Button */}
              <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
                <Image 
                  source={require('../assets/images.png')} 
                  style={styles.googleIcon}
                  resizeMode="contain"
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpLink}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="dark" />

      <Modal
        visible={showForgot}
        transparent
        animationType="slide"
        onRequestClose={() => setShowForgot(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowForgot(false)}
          />
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>I forgot the password</Text>
            <Text style={styles.modalSubtitle}>
              Enter 4-digit code sent to your email
            </Text>

            <View style={styles.modalInputWrapper}>
              <Text style={styles.icon}>✉</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

                <TouchableOpacity
                  style={styles.modalButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    setShowForgot(false);
                    setShowSaveInfo(true);
                  }}
                >
                  <Text style={styles.modalButtonText}>Continue</Text>
                </TouchableOpacity>
          </View>
        </View>
      </Modal>

          <Modal
            visible={showSaveInfo}
            transparent
            animationType="slide"
            onRequestClose={() => setShowSaveInfo(false)}
          >
            <View style={styles.modalOverlay}>
              <TouchableOpacity
                style={styles.modalBackdrop}
                activeOpacity={1}
                onPress={() => setShowSaveInfo(false)}
              />
              <View style={styles.modalSheet}>
                <Text style={styles.modalTitle}>Save your information</Text>
                <Text style={styles.modalSubtitle}>Click to save your information</Text>

                <TouchableOpacity
                  style={styles.modalButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    setShowSaveInfo(false);
                    setShowResetPassword(true);
                  }}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalLinkButton}
                  activeOpacity={0.7}
                  onPress={() => {
                    setShowSaveInfo(false);
                    setShowResetPassword(true);
                  }}
                >
                  <Text style={styles.modalLinkText}>Skip</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            visible={showResetPassword}
            transparent
            animationType="slide"
            onRequestClose={() => setShowResetPassword(false)}
          >
            <View style={styles.modalOverlay}>
              <TouchableOpacity
                style={styles.modalBackdrop}
                activeOpacity={1}
                onPress={() => setShowResetPassword(false)}
              />
              <View style={styles.modalSheet}>
                <Text style={styles.modalTitle}>Forget Password</Text>

                <View style={styles.resetSection}>
                  <Text style={styles.label}>New Password</Text>
                  <View style={styles.inputWrapper}>
                    <View style={styles.passwordIcon}>
                      <Text style={styles.iconText}>?</Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter new password"
                      placeholderTextColor="#999"
                      secureTextEntry
                    />
                  </View>
                </View>

                <View style={styles.resetSection}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={styles.inputWrapper}>
                    <View style={styles.passwordIcon}>
                      <Text style={styles.iconText}>?</Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm new password"
                      placeholderTextColor="#999"
                      secureTextEntry
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.modalButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    setShowResetPassword(false);
                    setShowPasswordUpdated(true);
                  }}
                >
                  <Text style={styles.modalButtonText}>Update Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            visible={showPasswordUpdated}
            transparent
            animationType="slide"
            onRequestClose={() => setShowPasswordUpdated(false)}
          >
            <View style={styles.modalOverlay}>
              <TouchableOpacity
                style={styles.modalBackdrop}
                activeOpacity={1}
                onPress={() => setShowPasswordUpdated(false)}
              />
              <View style={styles.modalSheet}>
                <View style={styles.successIcon}>
                  <Text style={styles.successCheck}>✓</Text>
                </View>
                <Text style={styles.successText}>Password Updated</Text>
              </View>
            </View>
          </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  wrapper: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    height: 50,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  passwordIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  separatorText: {
    marginHorizontal: 15,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 30,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  signUpText: {
    fontSize: 14,
    color: '#000',
  },
  signUpLink: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  modalInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalLinkButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalLinkText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  resetSection: {
    marginBottom: 20,
  },
  successIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  successCheck: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  successText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
