import streamlit as st
import matplotlib.pyplot as plt
import numpy as np

# Page Title
st.title("Hello NBCRS!")

st.markdown("---")  # Line separator

# Create 3 columns
col1, col2, col3 = st.columns(3)

# TDS
with col1:
    st.subheader("TDS")
    tds_fig = plt.figure(figsize=(2, 2))
    plt.plot([0, 1], [0, 1], label="TDS Line")
    plt.legend()
    st.pyplot(tds_fig)

# Moisture
with col2:
    st.subheader("Moisture")
    moisture_fig = plt.figure(figsize=(2, 2))
    plt.scatter([0, 1, 2], [2, 1, 0], color='red', label="Moisture Points")
    plt.legend()
    st.pyplot(moisture_fig)

# Temperature
with col3:
    st.subheader("Temperature")
    temp_fig = plt.figure(figsize=(2, 2))
    plt.bar(['Morning', 'Noon', 'Evening'], [20, 30, 25], color='green', label="Temperature Bars")
    plt.legend()
    st.pyplot(temp_fig)
