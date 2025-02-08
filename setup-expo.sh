#!/bin/bash

# Script to set up Homebrew, NVM, Node.js, and npm global installation path

# Step 1: Install Homebrew (without sudo)
echo "Installing Homebrew..."
mkdir -p $HOME/.brew
git clone --depth=1 https://github.com/Homebrew/brew $HOME/.brew
echo 'export PATH=$HOME/.brew/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# Step 2: Install NVM (Node Version Manager)
echo "Installing NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
source ~/.zshrc

# Step 3: Install Node.js using NVM
echo "Installing Node.js (LTS)..."
nvm install --lts
nvm use --lts

# Step 4: Configure npm global path
echo "Configuring npm global path..."
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=$HOME/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# Print the success message
echo "Setup complete! Homebrew, NVM, Node.js, and npm global path have been configured."
